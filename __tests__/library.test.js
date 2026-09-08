import {Library} from '../src/library.js'
import { Book } from '../src/book.js';
import { NotABookError, BookBorrowedError, BookNotFoundError, BookNotBorrowedError } from '../src/errors.js';

describe('Library Tests', () => {
    let library;

    beforeEach(()=>{
        library = new Library()
    })

    test('Creates a library with an empty books array', () => {
        expect(library.books).toEqual([])
    })

    test('Adds a single book when calling addBook() once', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        library.addBook(book)

        expect(library.books.length).toBe(1)
        expect(library.books[0].title).toBe('Snow Crash')
    })

    test('Should return an error if the data passed is not a Book', () => {
        
        expect(()=>{library.addBook('Bad data')}).toThrow(NotABookError)
    })

    test('viewAvailableBooks should return a list of currently available books (all available)', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        const book2 = new Book('Neuromancer', 'William Gibson')
        library.addBook(book)
        library.addBook(book2)

        expect(library.viewAvailableBooks()).toEqual([book, book2])
    })

    test('Returns only the books that have not been borrowed', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        const book2 = new Book('Neuromancer', 'William Gibson')
        const book3 = new Book('I Am Legend', 'Richard Matheson')
        book2.borrowBook()
        library.addBook(book)
        library.addBook(book2)
        library.addBook(book3)

        expect(library.viewAvailableBooks()).toEqual([book, book3])

    })

    test('Search should return the correct book when given a title', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        const book2 = new Book('Neuromancer', 'William Gibson')
        const book3 = new Book('I Am Legend', 'Richard Matheson')
        library.addBook(book)
        library.addBook(book2)
        library.addBook(book3)

        expect(library.searchBook('Snow Crash')).toEqual(book)
    })

    test('Search should return undefined if no items match', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        const book2 = new Book('Neuromancer', 'William Gibson')
        const book3 = new Book('I Am Legend', 'Richard Matheson')
        library.addBook(book)
        library.addBook(book2)
        library.addBook(book3)

        expect(library.searchBook('1984')).toBe(undefined)
    })

    test('Should successfully borrow an existing, available book', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        library.addBook(book)
        library.borrowBook('Snow Crash')
        expect(book.isBorrowed).toBe(true)
    })

    test('Should throw an error if the book exists, but has been borrowed', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        library.addBook(book)
        book.borrowBook()
        expect(() => library.borrowBook('Snow Crash')).toThrow(BookBorrowedError)
    })

    test('Should throw a separate Error if the book does not exist when borrowed', () => {
        expect(() => library.borrowBook('Snow Crash')).toThrow(BookNotFoundError) 
    })

    test('Should successfully return an existing, unavailable book', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        library.addBook(book)
        book.borrowBook()
        library.returnBook('Snow Crash')
        expect(book.isBorrowed).toBe(false)
    })

    test('Should throw an error if the book exists, and is available', () => {
        const book = new Book('Snow Crash', 'Neal Stephenson')
        library.addBook(book)
        expect(() => library.returnBook('Snow Crash')).toThrow(BookNotBorrowedError)
    })

    test('Should throw a separate Error if the book does not exist when returned', () => {
        expect(() => library.returnBook('Snow Crash')).toThrow(BookNotFoundError) 
    })
})

