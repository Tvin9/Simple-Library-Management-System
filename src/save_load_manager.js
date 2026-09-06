import fs from 'fs'
import { Library } from './library.js'
import { Book } from './book.js'

export function saveLibrary(path, library){
    const saveData = JSON.stringify(library.books)
    fs.writeFileSync(path, saveData)
}

export function loadLibrary(path){
    const loadedLibrary = new Library
    const loadData = JSON.parse(fs.readFileSync(path, 'utf8'))
    for(const data of loadData){
        const loadBook = new Book(data.title, data.author)
        if(data.isBorrowed) {
            loadBook.isBorrowed = true
        }
        loadedLibrary.addBook(loadBook)
    }
    return loadedLibrary
}