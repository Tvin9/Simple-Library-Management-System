# Simple Library Management System

A console-based Library Management System built in JavaScript (Node.js), allowing users to add, search, borrow, and return books, with persistence between sessions.

## How to run

**Requirements:** Node.js installed.

1. Clone the repository and navigate into the project folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm start
   ```
4. Follow the on-screen menu to add, view, search, borrow, or return books. Any prompt asking for input can be exited by typing `x` to return to the main menu.

To run the test suite:
   ```
   npm test
   ```

`main.js` loads from `data/library.db` by default, but if the database is either deleted, or corrupted, it can be reseeded:
   ```
   npm run seed
   ``` 


## Approach

The project was built bottom-up and test-first: `Book` was implemented and fully tested before `Library`, since `Library` depends on it. `Library` was implemented and tested before persistence, and persistence before the console interface (`main.js`), since `main.js` orchestrates everything below it. Each class/module was covered with Jest unit tests as it was built, rather than retrofitted afterward.

## Project structure

```
src/
  book.js               - Book class
  library.js            - Library class
  errors.js             - Custom error classes
  save_load_manager.js  - Persistence (save/load to JSON - superseded by SQLite - see Design decisions)
  database_manager.js   - SQLite persistence
  main.js               - Console menu interface
  isValidBookData.js    - Validation tool to prevent empty strings being passed into `Book` 
__tests__/
  book.test.js
  library.test.js
  save_load_manager.test.js
  database_manager.test.js
data/
  library.json          - Original seed data, still used by seed_database.js
  library.db            - SQLite seed data, loaded on startup
scripts/
  seed_database.js      - Generates library.db from library.json
```

## Design decisions

**Synchronous vs. asynchronous.** Since this is a small library running locally, it didn't make sense to go for an async approach, as there will be no calls to a network or a large database to block the code. Should this program be upscaled to use a larger data source, the `save_load_manager.js` would need to be refactored, along with its test suite, to use an async approach. This should not affect the logic in either `library.js`, or `book.js`. 

**Custom error classes.** Custom error classes are used in the project for clear error identification, which allows for testing against specific error types. 

**`Book` => `Library` => `main.js` flow of logic.** `Library` uses logic already defined in `Book`, which is eventually brought together by `main.js`. This allows comprehensive testing of each logic level, ensuring stable code.

**Save/Load is not built into `Library`.** `saveLibrary()`/`loadLibrary()` live in `save_load_manager.js`, separate from `Library`. Keeping `Library` free of any dependency on the file system allows for changing the save mechanism without affecting the logic in `library.js` or `main.js`. -- This enabled the final switch from a JSON save/load mechanism to a SQLite mechanism.

**Save after any change to the library by the user.** Rather than saving only when the user exits, the library is saved to disk after every successful add, borrow, or return. While this does increase the number of file writes required, it protects the data in case of a crash. Should the project be expanded to use a larger data source, this approach would have to be reconsidered - either saving on user exit, saving on manual input, or a timed save.

**`main.js` has no dedicated unit tests.** `main.js` uses `readline` to bring together independently tested methods.  Testing `main.js` would mean either simulating a real terminal session (which would test `readline` rather than the project itself), or refactoring its callbacks into separately testable pure functions. Given the complexity of these options, I opted for manual tests. Each option was tested, including error paths (e.g. borrowing an unavailable book, or searching for a non existing title). 

**Use of a console menu.** I did consider using an HTML/CSS user interface, but that would have required building a backend using Express, or similar. Using `readline` fit the brief for a menu-based interface, and browser-based UIs do not work with arbitrary read/write files (`fs`).

**SQLite** PostgreSQL was the first choice, as I have previous experience with it. It is, however, more suited to larger projects with persistent online databases rather than a "portable file-based database". SQLite stores the database as a single file, making it much more suitable for a small build with local storage.

**Save manager.** The `save_load_manager.js` is fully tested, but only the `loadLibrary()` logic is used to read the original JSON data before `saveToLibraryDb()` seeds the database where necessary. The `saveLibrary` function is dead code, but preserved to show the evolution of the program.

**No getters/setters.** `Book` and `Library` both currently use public properties. State changes are handled through `borrowBook()` and `returnBook()`, each with their own custom errors, ensuring safety. I did consider changing to private fields later in the development of the program, but by the time the code was working throughout, decided that  the risk of introducing new bugs outweighed the benefits of changing.

**Book data validation.** `isValidBookData()` was added after manual testing revealed that `Book` would accept an empty string for either the title or the author. `Book` now calls `isValidBookData()` before creating a new instance. `isValidBookData` has been moved to its own file so further logic can be added as needed without interfering with `Book` itself.

## Additional features implemented

- **"Go back" option**: any prompt asking for a title or author can be exited by typing `x`, returning the user to the main menu without completing the action. This unfortunately precludes `x` as either a title or author.

## Testing

Unit tests cover:
- `Book`: construction, borrowing, returning, and their respective error cases; `toString()` formatting in both states.
- `Library`: adding books (including rejecting non-`Book` input), viewing available books, searching by title (found and not-found cases), borrowing and returning (success and all error cases).
- Persistence: saving single/multiple/zero books, accurately preserving borrowed state, and loading data back as genuine `Book`/`Library` instances (not plain objects) with correct state restored.