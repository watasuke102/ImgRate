package db

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"main/graph/model"
	"strconv"
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

type UsersDB struct {
	id        int64
	name      string
	favorites string
	comments  string
}

func queryUser(db *sql.DB, name *string) ([]*UsersDB, error) {
	query := `
SELECT
	users.id AS id,
	users.name AS name,
	users.favorites AS favorites,
	GROUP_CONCAT(comments.comment) AS comments
FROM users
LEFT OUTER JOIN comments ON users.name = comments.name
`
	user_name := ""
	if name != nil {
		user_name = *name
		query += "WHERE users.name = ?"
	}
	query += "\nGROUP BY users.name"

	rows, err := db.Query(query, user_name)
	if err != nil {
		log.Println("Failed to query users", err)
		return nil, err
	}

	var users []*UsersDB
	for rows.Next() {
		id, name, favorites, comments := int64(-1), "", "", ""

		err = rows.Scan(&id, &name, &favorites, &comments)
		if id == -1 || name == "" {
			fmt.Println("Failed to scan user query", err)
			continue
		}

		fmt.Println(id, name, favorites, comments)
		users = append(users, &UsersDB{
			id: id, name: name, favorites: favorites, comments: comments,
		})
	}
	return users, nil
}

func GetUsers(db *sql.DB, name *string) ([]*model.User, error) {
	users_db, err := queryUser(db, name)
	if err != nil {
		return nil, err
	}

	users := []*model.User{}
	for _, user := range users_db {
		favorites := []int{}
		for _, favorite := range strings.Split(user.favorites, ",") {
			log.Printf("[%s] %s", user.name, favorite)
			num_i64, err := strconv.ParseInt(favorite, 10, 32)
			if err == nil {
				favorites = append(favorites, int(num_i64))
			} else {
				log.Println(">> parse error:", err)
			}
		}

		comments := []string{}
		if user.comments != "" {
			comments = strings.Split(user.comments, ",")
		}

		users = append(users, &model.User{
			ID:        int(user.id),
			Name:      user.name,
			Favorites: favorites,
			Comments:  comments,
		})
	}

	return users, nil
}
