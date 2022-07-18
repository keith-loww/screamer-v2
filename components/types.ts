type AuthorID = string;

export interface Post {
    id: string
    content: string
    authorID: AuthorID
    authorName: string,
    date: string,
    likedBy: AuthorID[]
}