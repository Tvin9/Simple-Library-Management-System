import { BookBorrowedError, BookNotBorrowedError, InvalidDataError } from "./errors.js";
import { isValidBookData } from "./isValidBookData.js";

export class Book {
    constructor(title, author){
        if(!isValidBookData(title, author)){
            throw new InvalidDataError('Title and author cannot be blank')
        }
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