package db

import (
	"database/sql"
	"errors"
	"log"
	"main/graph/model"
)

func AddComment(db *sql.DB, comment_to string, user_name string, comment string) error {
	if !UserExists(db, user_name) {
		return errors.New("user is not found")
	}

	res, err := db.Exec("INSERT INTO comments(commented_to, name, comment) VALUES (?, ?, ?)", comment_to, user_name, comment)
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

func GetComments(db *sql.DB, name *string) ([]*model.Comment, error) {
	query := "SELECT id, created_at, commented_to, comment FROM comments"
	user_name := ""
	if name != nil {
		user_name = *name
		query += " WHERE name = ?"
	}

	rows, err := db.Query(query, user_name)
	if err != nil {
		log.Println("Failed to query comments:", err)
		return nil, err
	}

	var comments []*model.Comment
	for rows.Next() {
		var comment model.Comment

		err = rows.Scan(&comment.ID, &comment.CreatedAt, &comment.CommentedTo, &comment.Comment)
		if err != nil {
			log.Println("Failed to scan comments query:", err)
			continue
		}

		comments = append(comments, &comment)
	}
	return comments, nil
}
