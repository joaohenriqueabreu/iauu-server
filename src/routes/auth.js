require('dotenv').config()
const api = require('express').Router()
const jwt = require('express-jwt')
const authController = require('../controller/auth')
const validationMiddleware = require('../middleware/validation')
// const authorizationMiddleware = require('../middleware/authorization')

api.post('/validate', jwt({ secret: process.env.AUTH_SECRET }), authController.validate)
api.post('/login', validationMiddleware.credentials, authController.login)
api.get('/login/facebook', validationMiddleware.oauth, authController.facebookLogin)
api.get('/login/google', validationMiddleware.oauth, authController.googleLogin)
api.get('/register', authController.register)
api.post('/verify', validationMiddleware.verify, authController.verify)
api.delete('/login', authController.logoff)
api.post('/register', validationMiddleware.newCrendentials, authController.register)
api.post('/reset/forgot', validationMiddleware.forgotPassword, authController.forgotPassword)
api.post('/reset/authorize', validationMiddleware.verify, authController.authorizeFromVerification)
api.post(
  '/reset/password',
  validationMiddleware.verify,
  validationMiddleware.resetPassword,
  authController.resetPassword
)

module.exports = api
