import { BookBorrowedError, BookNotBorrowedError } from "./errors.js";

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

    returnBook(){
        if(!this.isBorrowed){
            throw new BookNotBorrowedError(`${this.title} has not been borrowed.`)
        }
        this.isBorrowed = false;
    }

    toString(){
        const available = this.isBorrowed ? 'Borrowed' : 'Available'
        return `${this.title} by ${this.author} (${available})`
    }
}