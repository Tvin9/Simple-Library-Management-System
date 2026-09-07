import readline from 'readline'
import { Library } from './library.js'
import { Book } from './book.js'
import { saveLibrary, loadLibrary } from './save_load_manager.js'

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
    rl.question('\n1. Add a book \n2. View available books \n3. Search by title \n4. Borrow a book \n5. Return a book \n6. Exit \nChoose an option ', (answer)=>{
        switch (answer) {
            case '1':
                rl.question('\nEnter the title\nType x to return to menu\n', (title)=>{
                    if(title.trim().toLowerCase() === 'x'){
                        menu()
                    }else{
                        rl.question('\nEnter the author\nType x to return to menu\n', (author)=>{
                            
                            if(title.trim().toLowerCase() === 'x'){
                                menu()
                            }else{
                                const book = new Book(title, author)
                                library.addBook(book)
                                saveLibrary(libraryPath, library)
                                console.log(`${title} by ${author} has been added to the library.`) 
                                menu()
                            }
                        })
                    }
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
                rl.question('Enter the title of the book you\'re looking for\n', (title) => {
                    const searchedBook = library.searchBook(title)
                    if(searchedBook){
                        console.log(searchedBook.toString())
                    }else{
                        console.log('That book is not in the library')
                    }
                    menu()
                })
                break;
            case '4':
                rl.question('Enter the title of the book you would like to borrow\n', (title) => {
                    try{
                        library.borrowBook(title)
                        console.log(`You have borrowed ${title}`)
                        saveLibrary(libraryPath, library)
                    }catch(err){
                        console.log(err.message)
                    }
                    menu()
                })
                break;
            case '5':
                rl.question('Enter the title of the book you would like to return\n', (title) => {
                    try{
                        library.returnBook(title)
                        console.log(`You have returned ${title}`)
                        saveLibrary(libraryPath, library)
                    }catch(err){
                        console.log(err.message)
                    }
                    menu()
                })
                break;
            case '6':
                rl.close()
                break;
            default:
                console.log('Please choose from 1 to 6')
                menu()
        }
})}

menu()