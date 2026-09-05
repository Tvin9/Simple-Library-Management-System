import { Book } from "./book";
import { NotABookError, BookNotFoundError } from "./errors";

export class Library{
    constructor(){
        this.books = [];
    }

    addBook(book){
        if(book instanceof Book){
            this.books.push(book)
        }else{
            throw new NotABookError('Invalid book input')
        }        
    }

    viewAvailableBooks(){
        return this.books.filter((book) => !book.isBorrowed)
    }

    searchBook(title){
        return this.books.find((book) => book.title === title)
    }

    borrowBook(title){
        const borrowedBook = this.books.find((book) => book.title === title)
        if(borrowedBook){
            borrowedBook.borrowBook()
        }else{
            throw new BookNotFoundError('Book not found')
        }    
    }

    returnBook(title){
        const borrowedBook = this.books.find((book) => book.title === title)
        if(borrowedBook){
            borrowedBook.returnBook()
        }else{
            throw new BookNotFoundError('Book not found')
        } 
    }
}