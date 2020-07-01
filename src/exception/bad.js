const Exception = require('./exception')

module.exports = class BadRequestException extends Exception { 
    constructor(message) {
        super(message)
        this.code = 400
    }
}