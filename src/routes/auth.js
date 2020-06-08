const api   = require('express').Router()
const jwt   = require('jwt-simple')
const authController = require('../controller/auth')
const validationMiddleware = require('../middleware/validation')
const authorizationMiddleware = require('../middleware/authorization')

api.post('/validate', authorizationMiddleware.authorize())
api.post('/login', validationMiddleware.credentials, authController.login)
api.get('/register', authController.register)
api.delete('/login', authController.logoff)
api.post('/register', validationMiddleware.newCrendentials, authController.register)

module.exports = api