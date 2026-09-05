import {Library} from '../src/library'
import { Book } from '../src/book';
import { NotABook } from '../src/errors';

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
        
        expect(()=>{library.addBook('Bad data')}).toThrow(NotABook)
    })
    //test('', () => {})
    //test('', () => {})
    //test('', () => {})
    //test('', () => {})
})