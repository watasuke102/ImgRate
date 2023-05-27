.PHONY: all build run gen
all: gen build run

build:
	go build -o build/main

run:
	./build/main

# ???
gen:
	go get -d github.com/99designs/gqlgen/codegen@v0.17.31
	go get -d github.com/99designs/gqlgen@v0.17.31
	go run github.com/99designs/gqlgen generate
