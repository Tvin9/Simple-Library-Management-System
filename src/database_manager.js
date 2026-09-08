import Database from 'better-sqlite3'
import { Library } from './library.js'
import { Book } from './book.js' 

export function saveToLibraryDb(dbPath, library){
const db = new Database(dbPath)

db.exec("CREATE TABLE IF NOT EXISTS books (title TEXT, author TEXT, is_borrowed INTEGER)")

db.exec("DELETE FROM books")

const insert = db.prepare("INSERT INTO books (title, author, is_borrowed) VALUES (?, ?, ?)")
for (const book of library.books){
    insert.run(book.title, book.author, book.isBorrowed ? 1 : 0)
}

db.close()
}

export function loadFromLibraryDb(dbPath){
    const db = new Database(dbPath)
    const loadedLibrary = new Library
    const rows = db.prepare('SELECT * FROM books').all()
    
    for(const row of rows){
        const loadBook = new Book(row.title, row.author)
        row.is_borrowed === 0 ? loadBook.isBorrowed = false : loadBook.isBorrowed = true
        loadedLibrary.addBook(loadBook)
    }
    db.close()

    return loadedLibrary
}