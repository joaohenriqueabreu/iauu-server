require('dotenv').config()
const api   = require('express').Router()
const jwt = require('express-jwt')
const authController = require('../controller/auth')
const validationMiddleware = require('../middleware/validation')
// const authorizationMiddleware = require('../middleware/authorization')

api.post('/validate', jwt({secret: process.env.AUTH_SECRET}), authController.validate)
api.post('/login', validationMiddleware.credentials, authController.login)
api.get('/register', authController.register)
api.post('/verify', validationMiddleware.verify, authController.verify)
api.delete('/login', authController.logoff)
api.post('/register', validationMiddleware.newCrendentials, authController.register)

module.exports = api