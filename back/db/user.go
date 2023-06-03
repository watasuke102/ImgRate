package db

import (
	"database/sql"
	"errors"
	"log"
	"main/graph/model"
	"strings"
)

func UserExists(db *sql.DB, user_name string) bool {
	rows, err := db.Query("SELECT * FROM users WHERE name = ?", user_name)
	exists := err == nil && rows.Next()
	rows.Close()
	return exists
}

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

// func queryUser(db *sql.DB, name *string) ([]*UsersDB, error) {
func GetUsers(db *sql.DB, name *string) ([]*model.User, error) {
	query := "SELECT id, name, favorites FROM users"
	user_name := ""
	if name != nil {
		user_name = *name
		query += " WHERE name = ?"
	}

	rows, err := db.Query(query, user_name)
	if err != nil {
		log.Println("Failed to query users:", err)
		return nil, err
	}

	var users []*model.User
	for rows.Next() {
		var user model.User
		favorite_str := ""

		err = rows.Scan(&user.ID, &user.Name, &favorite_str)
		if user.ID == -1 || user.Name == "" {
			log.Println("Failed to scan user query:", err)
			continue
		}

		if favorite_str != "" {
			user.Favorites = strings.Split(favorite_str, ",")
		}
		users = append(users, &user)
	}
	return users, nil
}
