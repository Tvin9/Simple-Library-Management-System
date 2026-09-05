import { Book } from "./book";
import { NotABook } from "./errors";

export class Library{
    constructor(){
        this.books = [];
    }

    addBook(book){
        if(book instanceof Book){
            this.books.push(book)
        }else{
            throw new NotABook('Invalid book input')
        }        
    }

    viewAvailableBooks(){
        return this.books.filter((book) => !book.isBorrowed)
    }

    searchBook(title){
        return this.books.find((book) => book.title === title)
    }
}