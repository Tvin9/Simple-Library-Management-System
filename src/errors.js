export class BookBorrowedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookBorrowedError';
    }
}