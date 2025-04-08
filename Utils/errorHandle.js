export default class customError extends Error {
    constructor (statusCode, message){
        super(message);
        this.statusCode = statusCode;
    };
};