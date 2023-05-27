package db

import (
	"database/sql"
	"errors"
	"log"
)

func AddComment(db *sql.DB, user_name string, comment string) error {
	if !UserExists(db, user_name) {
		return errors.New("user is not found")
	}

	res, err := db.Exec("INSERT INTO comments(name, comment) VALUES (?, ?)", user_name, comment)
	if err != nil {
		log.Println("Comment insert error:", err)
		return err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return err
	}
	log.Printf("Comment added: '%s - %s' => %d\n", user_name, comment, id)

	return nil
}
