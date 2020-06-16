'use strict'

const BaseController = require('./base')
const RegisterUserService = require('../services/auth/registerUser')
const AuthenticateUserService = require('../services/auth/authenticateUser')
const VerifyUserService = require('../services/auth/verifyUser')
const ResetPasswordService = require('../services/auth/resetPassword')
const FacebookLoginService = require('../services/auth/facebookLogin')

class AuthController extends BaseController {
  register(req, res, next) {
    const { name, email, password, role } = req.data
    const registerUserSvc = new RegisterUserService(name, email, password, role)
    registerUserSvc
      .register()
      .then(() => {
        res.status(200).json({ message: 'Successfully registered. Please verify account' })
      })
      .catch((error) => next(error))
  }

  verify(req, res, next) {
    const { token } = req.data
    const verifyUserService = new VerifyUserService(token)

    verifyUserService
      .verify()
      .then(() => res.status(200).send(verifyUserService.getToken()))
      .catch((error) => next(error))
  }

  login(req, res, next) {
    const { email, password } = req.data
    const authenticateUserService = new AuthenticateUserService(email, password)

    authenticateUserService
      .login()
      .then(() => {
        res.status(200).json(authenticateUserService.getToken())
      })
      .catch((error) => next(error))
  }

  facebookLogin(req, res, next) {
    console.log('Facebook Login...')
    const { token } = req.data    
    const facebookLoginService = new FacebookLoginService(token)
      facebookLoginService
        .login()
        .then(() => res.status(200).send(facebookLoginService.getPayload()))
        .catch((error) => next(error))
  }

  googleLogin(req, res, next) {
    console.log('Google Login...')
  }

  validate(req, res) {
    console.log('Request authorized...')
    res.status(200).json(req.user)
  }

  authorizeFromVerification(req, res, next) {
    const { token } = req.data
    const verifyUserService = new VerifyUserService(token)

    verifyUserService
      .authorize()
      .then(() => res.status(200).send({ message: 'Authorized from verification token' }))
      .catch((error) => next(error))
  }

  forgotPassword(req, res, next) {
    const { email } = req.data
    const resetPasswordService = new ResetPasswordService({ email })
    resetPasswordService
      .forgot()
      .then(() => {
        res.status(200).json({ message: 'Successfully generated reset password token' })
      })
      .catch((error) => next(error))
  }

  resetPassword(req, res, next) {
    const { token, password } = req.data
    const resetPasswordService = new ResetPasswordService({ token, password })

    resetPasswordService
      .reset()
      .then(() => {
        res.status(200).json({ message: 'Successfully generated reset password token' })
      })
      .catch((error) => next(error))
  }

  logoff(req, res) {
    res.status(200).json({})
  }
}

module.exports = new AuthController()
