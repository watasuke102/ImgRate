package db

import (
	"database/sql"
	"log"
	"main/graph/model"
)

func GetImages(db *sql.DB) ([]*model.Image, error) {
	images := make(map[string]*model.Image)

	users, err := GetUsers(db, nil)
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		for _, favorite := range user.Favorites {
			log.Println(user.Name, favorite)
			if images[favorite] == nil {
				images[favorite] = &model.Image{ImgName: favorite}
			}
			images[favorite].FavoriteCnt += 1
		}
	}

	comments, err := GetComments(db, nil)
	if err != nil {
		return nil, err
	}
	for _, comment := range comments {
		if images[comment.CommentedTo] == nil {
			images[comment.CommentedTo] = &model.Image{ImgName: comment.CommentedTo}
		}
		images[comment.CommentedTo].Comments = append(images[comment.CommentedTo].Comments, comment)
	}

	var res []*model.Image
	for _, e := range images {
		res = append(res, e)
	}

	return res, nil
}
