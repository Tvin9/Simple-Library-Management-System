import {Book} from "../src/book.js"
import { BookBorrowedError, BookNotBorrowedError, InvalidDataError } from "../src/errors.js";

describe('Book tests', () => {
    let book;

    beforeEach(() => {
        book = new Book('1984', 'George Orwell')
    })

    test('creates a book with correct information', () => {
        expect(book.title).toBe('1984')
        expect(book.author).toBe('George Orwell')
        expect(book.isBorrowed).toBe(false)
    }) 

    test('sets the isBorrowed property to true when borrowBook() is called', () => {
        book.borrowBook()
        expect(book.isBorrowed).toBe(true)
    })
    
    test('throws an error is a book has already been borrowed', () => {
        book.borrowBook()
        expect(() => book.borrowBook()).toThrow(BookBorrowedError)
    })

    test('sets isBorrowed to false when returnBook() is called', () => {
        book.borrowBook()
        book.returnBook()
        expect(book.isBorrowed).toBe(false)
    })

    test('throws an error when returning a book that has not been borrowed', () => {
        expect(() => book.returnBook()).toThrow(BookNotBorrowedError)
    })

    test('toString() shows the title, author and whether a book is available by Author', () => {
        expect(book.toString()).toBe('1984 by George Orwell (Available)')
        book.borrowBook()
        expect(book.toString()).toBe('1984 by George Orwell (Borrowed)') 
    })
})

describe('Data validation', () => {
    test('Should throw an error when attempting to create a book from an empty title', () => {
        expect(() => {new Book('', 'George Orwell')}).toThrow(InvalidDataError)   
    })

    test('Should throw an error when attempting to create a book from an empty author', () => {
        expect(() => {new Book('1985', '')}).toThrow(InvalidDataError)   
    })
})

 