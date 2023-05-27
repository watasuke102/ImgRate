package main

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

func main() {
	executable_name, err := os.Executable()
	if err != nil {
		fmt.Println("Failed to get the path to Executable")
		os.Exit(1)
	}

	db, err := sql.Open("sqlite", filepath.Join(filepath.Dir(executable_name), "../sqlite.db"))
	if err != nil {
		fmt.Println("Failed to open sqlite.db")
		os.Exit(1)
	}

	rows, err := db.Query("SELECT * FROM users;")
	if err != nil {
		fmt.Println("Failed to query 'users' table")
		os.Exit(1)
	}

	for rows.Next() {
		var i int
		var name string
		var favorites string

		if err = rows.Scan(&i, &name, &favorites); err != nil {
			fmt.Println("Failed to scan")
			continue
		}

		fmt.Printf("%d: name: '%s', favorites: '%s'\n", i, name, favorites)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Error occurred during Row iteration")
		os.Exit(1)
	}

	if err = db.Close(); err != nil {
		fmt.Println("Failed to close DB connection")
		os.Exit(1)
	}

	fmt.Println("Exiting...")
}
