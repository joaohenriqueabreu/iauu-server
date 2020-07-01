const Exception = require('../exception/exception')

module.exports = (error, req, res, next) => {  
    console.log('Something is wrong...')
    console.log(error)

    if (error instanceof Exception) {
        return res.status(error.code).json(error.message)
    }

    return res.status(500).json(error)
}