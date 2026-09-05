import {Book} from "../src/book.js"

describe('Book', () => {
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
    //test('', () => {})
})