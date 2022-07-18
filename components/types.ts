type UserID = string;

export interface Post {
    id: string,
    content: string,
    author: User,
    date: string,
    likedBy: UserID[],
}

export interface User {
    id: string,
    name: string,
    username: string,
    created_at: string,
    picture: string,
    posts: Post[]
}