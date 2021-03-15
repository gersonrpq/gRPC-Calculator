package main

import (
	"context"
	"log"
	"time"
	"os"
	"strconv"
	grpc "google.golang.org/grpc"
	pb "go-client/service"
)


const (
	address = "localhost:80"
)

func main() {
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewCalculatorClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	if len(os.Args) == 4 {
		v1, _ :=  strconv.ParseFloat(os.Args[1],32)
		value1 := float32(v1)
		v2, _ :=  strconv.ParseFloat(os.Args[2],32)
		value2 := float32(v2)
		operator := string(os.Args[3])
		switch operator {
		case "+":
			r, err :=  c.Sum(ctx, &pb.Numbers{Value1: &pb.Number{Value: value1,}, Value2: &pb.Number{Value: value2,}})
			if err != nil {
				log.Fatalf("Could not calculate: %v", err)
			}
			log.Printf("The result is: %f", r.GetValue())
		case "-":
			r, err :=  c.Substract(ctx, &pb.Numbers{Value1: &pb.Number{Value: value1,}, Value2: &pb.Number{Value: value2,}})
                        if err != nil {
                                log.Fatalf("Could not calculate: %v", err)
                        }
                        log.Printf("The result is: %f", r.GetValue())

		case "x":
			r, err :=  c.Multiplication(ctx, &pb.Numbers{Value1: &pb.Number{Value: value1,}, Value2: &pb.Number{Value: value2,}})
                        if err != nil {
                                log.Fatalf("Could not calculate: %v", err)
                        }
                        log.Printf("The result is: %f", r.GetValue())

		case "/":
			r, err :=  c.Divide(ctx, &pb.Numbers{Value1: &pb.Number{Value: value1,}, Value2: &pb.Number{Value: value2,}})
                        if err != nil {
                                log.Fatalf("Could not calculate: %v", err)
                        }
                        log.Printf("The result is: %f", r.GetValue())
		default:
			log.Printf("Please select one of this operators + - / x")
		}
	} else {
		log.Printf("Three arguments must be given in this order 2 2 /, value value operator")
		log.Printf("Formultiplication case use x, for example 3 3 x")
	}
}
