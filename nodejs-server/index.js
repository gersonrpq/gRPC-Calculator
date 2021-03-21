var PROTO_PATH = __dirname + '/../service.proto'
var grpc = require("@grpc/grpc-js")
var protoLoader = require('@grpc/proto-loader')
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    })
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
var calculator = protoDescriptor.Calculator

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
