import { BookBorrowedError } from "./errors";

export class Book {
    constructor(title, author){
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

    borrowBook(){
        if(this.isBorrowed){
            throw new BookBorrowedError(`${this.title} is not currently available.`)
        }
        this.isBorrowed = true;
    }
}