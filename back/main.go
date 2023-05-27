package main

import (
	"main/graph"
	"database/sql"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"

	_ "modernc.org/sqlite"
)

func main() {
	executable_name, err := os.Executable()
	if err != nil {
		log.Fatalln("Failed to get the path to Executable")
	}

	db, err := sql.Open("sqlite", filepath.Join(filepath.Dir(executable_name), "../db/sqlite.db"))
	if err != nil {
		log.Fatalln("Failed to open sqlite.db")
	}

	if err = DB_init(db); err != nil {
		log.Fatalln("Failed to initialize DB")
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", "8080")
	log.Fatalln(http.ListenAndServe(":8080", nil))
}
