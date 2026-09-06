import readline from 'readline'
import { Library } from './library.js'
import { Book } from './book.js'
import { saveLibrary, loadLibrary } from './save_load_manager'

const libraryPath = 'data/library.json'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let library

try{
    library = loadLibrary(libraryPath)
}catch{
    library = new Library()
}

function menu(){
    rl.question('\n1. Add a book \n2. View available books \n3. Search by title \n4. Borrow a book \n5. Return a book \n6. Exit \nChoose an option', (answer)=>{
        switch (answer) {
            case '1':
                rl.question('\nEnter the title', (title)=>{
                    rl.question('\nEnter the author', (author)=>{
                        const book = new Book(title, author)
                        library.addBook(book)
                        saveLibrary(libraryPath, library)
                        console.log(`${title} by ${author} has been added to the library.`) 
                        menu()
                    })
                })
                break;
            case '2':
                const availableBooks = library.viewAvailableBooks()
                if(availableBooks.length > 0){
                    availableBooks.forEach((book) => console.log(book.toString()))
                }else{
                    console.log('No books are currently available')
                }
                menu()
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                break;
            case '6':
                break;
        }
})}