export function isValidBookData(title, author){
    if(title === null || title === undefined || title.trim() === ''||author === null || author === undefined || author.trim() === ''){
        return false;
    }
    return true;
}