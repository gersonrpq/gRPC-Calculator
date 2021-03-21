#!/usr/bin/env python3

import service_pb2_grpc
import service_pb2
import grpc
from concurrent import futures

class Calculator(service_pb2_grpc.Calculator):
    def Sum(self, numbers, context):
        result = numbers.value1.value + numbers.value2.value
        return service_pb2.Number(value=result)

    def Substract(self, numbers, context):
        result = numbers.value1.value - numbers.value2.value
        return service_pb2.Number(value=result)

    def Divide(self, numbers, context):
        result = numbers.value1.value / numbers.value2.value
        return service_pb2.Number(value=result)
    
    def Multiplication(self, numbers, context):
        result = numbers.value1.value * numbers.value2.value
        return service_pb2.Number(value=result)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_CalculatorServicer_to_server(Calculator(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    print('Starting grpc service...')
    serve()
    
