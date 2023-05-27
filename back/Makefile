.PHONY: all build run gen
all: build run

build:
	go build -o build/main

run:
	./build/main

# ???
pre_gen:
	go get -d github.com/99designs/gqlgen/codegen@v0.17.31
	go get -d github.com/99designs/gqlgen@v0.17.31
gen: pre_gen
	go run github.com/99designs/gqlgen generate
