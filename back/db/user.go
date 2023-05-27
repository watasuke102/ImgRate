package db

import (
	"database/sql"
	"errors"
	"log"
)

func AddUser(db *sql.DB, user_name string) error {
	if UserExists(db, user_name) {
		return errors.New("user already exists")
	}

	res, err := db.Exec("INSERT INTO users(name, favorites) VALUES (?, '')", user_name)
	if err != nil {
		log.Println("User insert error:", err)
		return err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return err
	}
	log.Printf("User added: '%s' => %d\n", user_name, id)

	return nil
}

func UpdateUser(db *sql.DB, user_name string, favorites string) error {
	if !UserExists(db, user_name) {
		return errors.New("user is not found")
	}

	res, err := db.Exec("UPDATE users SET favorites = ? WHERE name = ?", favorites, user_name)
	if err != nil {
		log.Println("User update error: ", err)
		return err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return err
	}
	log.Printf("User updated: '%s'[%d] = '%s'\n", user_name, id, favorites)

	return nil
}
