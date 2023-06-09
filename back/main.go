// ImGrate - Image gallery rated by favorites and comments
// main.go
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
package main

import (
	"database/sql"
	"log"
	"main/db"
	"main/graph"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"

	_ "modernc.org/sqlite"
)

func main() {
	database, err := sql.Open("sqlite", "sqlite/sqlite.db")
	if err != nil {
		log.Fatalln("Failed to open sqlite.db")
	}

	if err = db.Init(database); err != nil {
		log.Fatalln("Failed to initialize DB:", err)
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: database}}))
	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
	})

	http.Handle("/play", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", cors.Handler(srv))

	log.Println("Listening http://localhost:8080")
	log.Println("  /play  : GraphQL playground")
	log.Println("  /query : GraphQL endpoint")
	log.Fatalln(http.ListenAndServe(":8080", nil))
}
