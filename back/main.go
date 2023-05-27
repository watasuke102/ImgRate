package main

import (
	"database/sql"
	"log"
	"main/db"
	"main/graph"
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

	path := filepath.Join(filepath.Dir(executable_name), "../sqlite")
	if err := os.Mkdir(path, 0755); err != nil && !os.IsExist(err) {
		log.Fatalln("Failed to create 'sqlite' dir")
	}

	database, err := sql.Open("sqlite", filepath.Join(path, "sqlite.db"))
	if err != nil {
		log.Fatalln("Failed to open sqlite.db")
	}

	if err = db.Init(database); err != nil {
		log.Fatalln("Failed to initialize DB")
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: database}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", "8080")
	log.Fatalln(http.ListenAndServe(":8080", nil))
}
