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

    test('should save a library to a db file', () => {
        const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))

        saveToLibraryDb(testDbPath, library)

        const db = new Database(testDbPath)
        const rows = db.prepare('SELECT * FROM books').all()
        db.close()

        expect(rows.length).toBe(1)
        expect(rows[0].title).toBe('Ghost in the Shell')
        expect(rows[0].author).toBe('Masamune Shirow')
        expect(rows[0].is_borrowed).toBe(0)
    })

    test('Should sucessfully load a library', () => {
        const library = new Library()
        library.addBook(new Book('Ghost in the Shell', 'Masamune Shirow'))

        saveToLibraryDb(testDbPath, library)

        const loadedLibrary = loadFromLibraryDb(testDbPath)

        expect(loadedLibrary).toBeInstanceOf(Library)
        expect(loadedLibrary.books.length).toBe(1)
        expect(loadedLibrary.books[0]).toBeInstanceOf(Book)
        expect(loadedLibrary.books[0].title).toBe('Ghost in the Shell')
        expect(loadedLibrary.books[0].author).toBe('Masamune Shirow')
        expect(loadedLibrary.books[0].isBorrowed).toBe(false)
    })
})