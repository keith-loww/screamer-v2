type UserID = string;

export interface Post {
    id: string,
    content: string,
    author: UserShort,
    date: string,
    likedBy: UserID[],
}

export interface User {
    id: string,
    name: string,
    nickname: string,
    created_at: string,
    picture: string,
    posts: Post[]
}

export interface UserShort {
    id: string,
    nickname: string,
    picture: string
}