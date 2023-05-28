// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type NewComment struct {
	UserName string `json:"user_name"`
	Comment  string `json:"comment"`
}

type NewUser struct {
	UserName string `json:"user_name"`
}

type User struct {
	ID        int      `json:"id"`
	Name      string   `json:"name"`
	Favorites []int    `json:"favorites"`
	Comments  []string `json:"comments"`
}

type UserUpdate struct {
	UserName  string  `json:"user_name"`
	Favorites *string `json:"favorites,omitempty"`
}
