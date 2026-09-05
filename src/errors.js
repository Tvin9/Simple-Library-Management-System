export class BookBorrowedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookBorrowedError';
    }
}

export class BookNotBorrowedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookNotBorrowedError'
    }
}

export class NotABook extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotABook'
    }
}
