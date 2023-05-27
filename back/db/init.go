package db

import (
	"database/sql"
)

func Init(db *sql.DB) error {
	_, err := db.Exec(`
CREATE TABLE IF NOT EXISTS users(
  id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name      TEXT    NOT NULL UNIQUE,
  favorites TEXT 
);

CREATE TABLE IF NOT EXISTS comments(
  id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name    TEXT    NOT NULL,
  comment TEXT    NOT NULL
);`)
	return err
}

func UserExists(db *sql.DB, user_name string) bool {
	rows, err := db.Query("SELECT * FROM users WHERE name = ?", user_name)
	return err == nil && rows.Next()
}
