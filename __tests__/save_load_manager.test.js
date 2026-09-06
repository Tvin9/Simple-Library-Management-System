import fs from 'fs'
import { saveLibrary, loadLibrary } from '../src/save_load_manager.js'
import { Library } from '../src/library.js'
import { Book } from '../src/book.js'

const testPath = 'data/test_library.json'

describe('Save to persistent library', () => {
    afterEach(()=>{
        if(fs.existsSync(testPath)){
            fs.unlinkSync(testPath)
        } 
    })

    test('writes data to library as JSON', () => {
        const library = new Library()
        library.addBook(new Book('Do Androids Dream of Electric Sheep', 'Philip K. Dick'))

        saveLibrary(testPath, library)

        const libraryContents = fs.readFileSync(testPath, 'utf8')
        expect(libraryContents).toBe(JSON.stringify(library.books))
    })

    test('Correclty saves multiple books to a library', () => {
        const library = new Library()
        library.addBook(new Book('Do Androids Dream of Electric Sheep', 'Philip K. Dick'))
        library.addBook(new Book('Altered Carbon', 'Richard K. Morgan'))
        library.addBook(new Book('Akira', 'Katsuhiro Otomo'))

        saveLibrary(testPath, library)

        const libraryContents = fs.readFileSync(testPath, 'utf8')
        expect(libraryContents).toBe(JSON.stringify(library.books))
    })

    test('Saves an empty library', () => {
        const library = new Library()
        
        saveLibrary(testPath, library)

        const libraryContents = fs.readFileSync(testPath, 'utf8')
        expect(libraryContents).toBe(JSON.stringify(library.books))
    })

    test('Save accurately reflets the borrowd state of a book', () => {
        const library = new Library()
        library.addBook(new Book('Do Androids Dream of Electric Sheep', 'Philip K. Dick'))
        library.borrowBook('Do Androids Dream of Electric Sheep')

        saveLibrary(testPath, library)

        const libraryContents = JSON.parse(fs.readFileSync(testPath, 'utf8'))
        expect(libraryContents[0].isBorrowed).toBe(true)
    })
})

describe('Load from an established library', () => {
    let library
    
    beforeEach(()=>{
        library = new Library()
        library.addBook(new Book('Do Androids Dream of Electric Sheep', 'Philip K. Dick'))
        library.addBook(new Book('Altered Carbon', 'Richard K. Morgan'))
        library.addBook(new Book('Akira', 'Katsuhiro Otomo'))
        library.borrowBook('Do Androids Dream of Electric Sheep')
        saveLibrary(testPath, library)
    })

    afterEach(()=>{
        if(fs.existsSync(testPath)){
            fs.unlinkSync(testPath)
        } 
    })

    test('Loads a previously saved library as a Library, not a string', () => {
        const loadedLibrary = loadLibrary(testPath)

        expect(loadedLibrary).toBeInstanceOf(Library)
    })

    test('Should load a library of the correct length', () => {
        const loadedLibrary = loadLibrary(testPath)

        expect(loadedLibrary.books.length).toBe(3)
    })

    test('Returns accurate information of the books', () => {
        const loadedLibrary = loadLibrary(testPath)

        expect(loadedLibrary.books[1].title).toBe('Altered Carbon')
        expect(loadedLibrary.books[2].author).toBe('Katsuhiro Otomo')
        expect(loadedLibrary.books[0].isBorrowed).toBe(true)
    })

})