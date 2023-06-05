// ImGrate - Image gallery rated by favorites and comments
// init.go
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
package db

import (
	"database/sql"
)

func Init(db *sql.DB) error {
	_, err := db.Exec(`
CREATE TABLE IF NOT EXISTS users(
  id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  created_at TEXT    NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
  updated_at TEXT    NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
  name       TEXT    NOT NULL UNIQUE,
  favorites  TEXT
);

CREATE TABLE IF NOT EXISTS comments(
  id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT    NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
  commented_to TEXT    NOT NULL,
  user_name    TEXT    NOT NULL,
  comment      TEXT    NOT NULL
);
`)
	return err
}
