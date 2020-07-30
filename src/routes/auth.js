require('dotenv').config()
const api = require('express').Router()
const jwt = require('express-jwt')
const authController = require('../controller/auth')
const adminController = require('../controller/admin')
const validationMiddleware = require('../middleware/validation')
const authorizationMiddleware = require('../middleware/authorization')

api.post('/login', validationMiddleware.credentials, authController.login)
api.post('/loginAs', validationMiddleware.adminCredentials, adminController.loginAsUser)
api.post('/login/facebook', validationMiddleware.social, authController.facebookLogin)
api.post('/login/google', validationMiddleware.social, authController.googleLogin)
api.post('/verify', validationMiddleware.verify, authController.verify)
api.post('/verify/resend', validationMiddleware.verify, authController.resendVerification)
api.post('/role', authorizationMiddleware.authorize, validationMiddleware.role, authController.assignRole)
api.post('/validate', jwt({ secret: process.env.AUTH_SECRET }), authController.validate)
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
