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
var client = new protoDescriptor.Calculator('localhost:8000', grpc.credentials.createInsecure())


if (require.main === module) {
  var v1 = parseFloat(process.argv[2])
  var v2 = parseFloat(process.argv[3])
  var operator = process.argv[4]
  

  if (typeof(v1) === "number" && typeof(v2) === "number" && ["+","-","/","x"].includes(operator)){
    switch (operator) {
      case "+":
        client.sum({value1: {value: v1},value2: {value: v2}},(err, response) => { 
		console.log("The result is : " +response.value.toString())})
        break;
      case "-":
        client.substract({value1: {value: v1},value2: {value: v2}},(err, response) => { 
                console.log("The result is : " +response.value.toString())})
        break;
      case "/":
        client.divide({value1: {value: v1},value2: {value: v2}},(err, response) => { 
                console.log("The result is : " +response.value.toString())})
        break;		    
      case "x":
        client.multiplication({value1: {value: v1},value2: {value: v2}},(err, response) => { 
                console.log("The result is : " +response.value.toString())})
        break;
    }
  } else {
    console.log("Please check the input values, the must be like 2 2 +")
  } 
}

