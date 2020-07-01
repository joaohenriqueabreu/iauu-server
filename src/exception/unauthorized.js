const Exception = require('./exception')

module.exports = class UnauthorizedException extends Exception { 
    constructor(message) {
        super(message)
        this.code = 401
    }
}