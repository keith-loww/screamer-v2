type AuthorID = string;

export interface Post {
    id: string
    content: string
    author: AuthorID
    date: string,
    likedBy: AuthorID[]
}

export interface User {
    id: string,
    name: string,
    username: string,
    created_at: string,
    pciture: string,
    posts: Post[]
}