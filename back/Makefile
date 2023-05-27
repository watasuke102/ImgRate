.PHONY: all run pre_gen gen

run:
	go run .

# ???
pre_gen:
	go get -d github.com/99designs/gqlgen/codegen@v0.17.31
	go get -d github.com/99designs/gqlgen@v0.17.31
gen: pre_gen
	go run github.com/99designs/gqlgen generate
