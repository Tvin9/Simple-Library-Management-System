import fs from 'fs'
import Database from 'better-sqlite3'
import { Library } from '../src/library.js'
import { Book } from '../src/book.js'
import { saveToLibraryDb, loadFromLibraryDb } from '../src/database_manager.js'

const testDbPath = 'data/test_library.db'

describe('Database manager tests', () => {
    afterEach(() => {
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath)
        }
    })

    test('Returns accurate book information when saving', () => {
        const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))

        saveToLibraryDb(testDbPath, library)

        const db = new Database(testDbPath)
        const rows = db.prepare('SELECT * FROM books').all()
        db.close()

        expect(rows[0].title).toBe('Ghost in the Shell')
        expect(rows[0].author).toBe('Masamune Shirow')
        expect(rows[0].is_borrowed).toBe(0)
    })

    test("Saves the correct number of books", () => {
         const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))
        library.addBook(new Book('Ready Player One', 'Ernest Cline'))
        library.addBook(new Book('Watchmen', 'Alan Moore'))

        saveToLibraryDb(testDbPath, library)

        const db = new Database(testDbPath)
        const rows = db.prepare('SELECT * FROM books').all()
        db.close()

        expect(rows.length).toBe(3)
    })

    test('Should successfully load an instance of abook, and an instance of a library', () => {
        const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))

        saveToLibraryDb(testDbPath, library)

        const loadedLibrary = loadFromLibraryDb(testDbPath)

        expect(loadedLibrary).toBeInstanceOf(Library)
        expect(loadedLibrary.books[0]).toBeInstanceOf(Book)
        
    })

    test('Should return the correct number of books', () => {
        const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))
        library.addBook(new Book('Ready Player One', 'Ernest Cline'))
        library.addBook(new Book('Watchmen', 'Alan Moore'))

        saveToLibraryDb(testDbPath, library)

        const loadedLibrary = loadFromLibraryDb(testDbPath)

        expect(loadedLibrary.books.length).toBe(3)
    })

    test('Book data should be accurately loaded', () => {
        const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))

        saveToLibraryDb(testDbPath, library)

        const loadedLibrary = loadFromLibraryDb(testDbPath)

        expect(loadedLibrary.books[0].title).toBe('Ghost in the Shell')
        expect(loadedLibrary.books[0].author).toBe('Masamune Shirow')
        expect(loadedLibrary.books[0].isBorrowed).toBe(false)
    })
})