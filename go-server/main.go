package main

import (
    "context"
    "log"
    "net"
    grpc "google.golang.org/grpc"
    f "fmt"
    pb "go-server/service"

)

type calculatorServer struct {
  pb.UnimplementedCalculatorServer
}

func (c *calculatorServer) Sum(ctx context.Context, nbs *pb.Numbers) (*pb.Number, error) {
  f.Println("Hola!")
  v1 := nbs.GetValue1()
  v2 := nbs.GetValue2()
  result := v1.Value + v2.Value
  return &pb.Number{Value: result, }, nil
}

func (c *calculatorServer) Substract(ctx context.Context, nbs *pb.Numbers) (*pb.Number, error) {
  v1 := nbs.GetValue1()
  v2 := nbs.GetValue2()
  result := v1.Value - v2.Value
  return &pb.Number{Value: result, }, nil
}

func (c *calculatorServer) Multiplication(ctx context.Context, nbs *pb.Numbers) (*pb.Number, error) {
  v1 := nbs.GetValue1()
  v2 := nbs.GetValue2()
  result := v1.Value * v2.Value
  return &pb.Number{Value: result, }, nil
}

func (c *calculatorServer) Divide(ctx context.Context, nbs *pb.Numbers) (*pb.Number, error) {
  v1 := nbs.GetValue1()
  v2 := nbs.GetValue2()
  result := v1.Value / v2.Value
  return &pb.Number{Value: result, }, nil
}

func main() {
  lis, err := net.Listen("tcp", ":80")
  if err != nil {
    log.Fatalf("Faile to listen: %v", err)
  }
  s := grpc.NewServer()
  pb.RegisterCalculatorServer(s, &calculatorServer{})
  if err := s.Serve(lis); err != nil {
    log.Fatalf("Failed to serve: %v", err)
  }
}
