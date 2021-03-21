const PROTO_PATH = __dirname + '/../service.proto'
const grpc = require("@grpc/grpc-js")
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    })
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const calculator = protoDescriptor.Calculator

function sum(call, callback) {
  console.log("Someone has made a sum")
  var result =  call.request.value1.value + call.request.value2.value
  callback(null, {value: result})
}

function substract(call, callback) {
  console.log("Someone has made a substract")
  var result =  call.request.value1.value - call.request.value2.value
  callback(null, {value: result})
}

function multiplication(call, callback) {
  console.log("Someone has made a multiplication")
  var result =  call.request.value1.value + call.request.value2.value
  callback(null, {value: result})
}

function divide(call, callback) {
  console.log("Someone has made a division")
  var result =  call.request.value1.value + call.request.value2.value
  callback(null, {value: result})
}

function getServer() {
  var server = new grpc.Server()
  server.addService(calculator.service, {
    Sum: sum,
    Substract: substract,
    Multiplication: multiplication,
    Divide: divide
  })
  return server
}

if (require.main === module) {
  var calculatorServer = getServer()
  calculatorServer.bindAsync('0.0.0.00:8000', grpc.ServerCredentials.createInsecure(), () => {
    calculatorServer.start()
  })
}

//exports.getServer = getServer;
