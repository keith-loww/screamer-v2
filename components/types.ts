type AuthorID = string;

export interface Post {
    id: string
    content: string
    author: AuthorID
    date: string,
    likedBy: AuthorID[]
}