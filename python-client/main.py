import grpc
import service_pb2_grpc
import service_pb2
import sys

channel = grpc.insecure_channel('localhost:50051')
stub = service_pb2_grpc.CalculatorStub(channel)

methods = { 
    "+": stub.Sum,
    "-": stub.Substract,
    "x": stub.Multiplication,
    "/": stub.Divide,
}

if __name__ == "__main__":
    args = sys.argv
    number1 = service_pb2.Number(value=int(args[1]))
    number2 = service_pb2.Number(value=int(args[2]))
    numbers = service_pb2.Numbers(value1=number1, value2=number2)

    try:
        result_future = methods[args[3]].future(numbers)
        result = result_future.result()
        print(result)
    except:
        print("Three arguments must be given in this order 2 2 /, value value operator")
        print("For multiplication case use x, for example 3 3 x")
