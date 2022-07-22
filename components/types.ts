type UserID = string;

export interface Post {
    id: string,
    content: string,
    author: UserShort,
    date: string,
    likedBy: UserID[],
    comments: Comment[]
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

export interface Comment {
    id: string,
    content: string,
    author: UserShort,
    date: string,
    likedBy: UserID[],
}

export type PostData = {
    id: string,
    content: string,
    author: string,
    date: string,
    likedBy: string[],
    comments: string[]
}