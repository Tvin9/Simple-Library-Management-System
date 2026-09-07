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

## Approach

The project was built bottom-up and test-first: `Book` was implemented and fully tested before `Library`, since `Library` depends on it. `Library` was implemented and tested before persistence, and persistence before the console interface (`main.js`), since `main.js` orchestrates everything below it. Each class/module was covered with Jest unit tests as it was built, rather than retrofitted afterward.

## Project structure

```
src/
  book.js               - Book class
  library.js            - Library class
  errors.js             - Custom error classes
  save_load_manager.js  - Persistence (save/load to JSON)
  main.js               - Console menu interface
__tests__/
  book.test.js
  library.test.js
  save_load_manager.test.js
data/
  library.json          - Seed data, loaded on startup
```

## Design decisions

**Custom error classes.** Rather than having `borrowBook()`/`returnBook()` return `true`/`false` on failure (as suggested by the spec's Java-style signatures), this implementation throws custom error classes.

**`Library` delegates to `Book`, rather than duplicating its logic.** `Library.borrowBook(title)`/`returnBook(title)` find the relevant book and call its own `borrowBook()`/`returnBook()` methods, rather than mutating `isBorrowed` directly.

**Empty results are not errors.** `viewAvailableBooks()` returning an empty array (no books currently available) and `searchBook()` returning `undefined` (no match found) are both treated as valid, expected outcomes rather than exceptions. Only genuine misuse (borrowing an already-borrowed book, searching by a title that doesn't correspond to any book at all during borrow/return) throws an error. This distinction was made deliberately partway through development, after initially over-applying error-throwing to a case (no available books) that didn't actually warrant it.

**Save/Load is not built into `Library`.** `saveLibrary()`/`loadLibrary()` live in `save_load_manager.js`, seperate from `Library`. This keeps `Library` free of any dependency on the file system, this allows changin the save mechanism without affecting the login in library.js, or main.js.

**Save-after-every-change persistence.** Rather than saving only when the user exits, the library is saved to disk after every successful add, borrow, or return. While this does increase the nnumber of file writes required, it protects the data in case of a crash.

**`main.js` has no dedicated unit tests.** `main.js` uses `readline` to bring together independently tested methods.  Testing main.js would mean eihter simulating a real terminal session (which would test `readline` rather than the project itself), or refactoring its callbacks into separately-testable pure functions. Given the complexity of these options, I opted for manual tests.

## Additional features implemented

- **"Go back" option**: any prompt asking for a title or author can be exited by typing `x`, returning the user to the main menu without completing the action.

## Testing

Unit tests cover:
- `Book`: construction, borrowing, returning, and their respective error cases; `toString()` formatting in both states.
- `Library`: adding books (including rejecting non-`Book` input), viewing available books, searching by title (found and not-found cases), borrowing and returning (success and all error cases).
- Persistence: saving single/multiple/zero books, accurately preserving borrowed state, and loading data back as genuine `Book`/`Library` instances (not plain objects) with correct state restored.