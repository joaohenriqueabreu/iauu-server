module.exports = class Exception extends Error {
    constructor(message) {
        super(message)
        this.code = 500
        this.message = message
    }
}