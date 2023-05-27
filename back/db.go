package main

import "database/sql"

func DB_init(db *sql.DB) error {
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
