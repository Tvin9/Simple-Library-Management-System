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

export class NotABookError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotABook'
    }
}


export class BookNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookNotFound'
    }
}