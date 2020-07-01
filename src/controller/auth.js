'use strict'

const BaseController = require('./base')
const RegisterUserService = require('../services/auth/registerUser')
const LoginUserService = require('../services/auth/loginUser')
const VerifyUserService = require('../services/auth/verifyUser')
const ResetPasswordService = require('../services/auth/resetPassword')
const FacebookLoginService = require('../services/auth/facebookLogin')
const GoogleLoginService = require('../services/auth/googleLogin')
const AssignRoleService = require('../services/auth/assignRole')
const GenerateTokenService = require('../services/auth/generateToken')

class AuthController extends BaseController {
  register(req, res, next) {
    const { name, email, password, role } = req.data
    const registerUserSvc = new RegisterUserService(name, email, password, role)

    registerUserSvc.register()
      .then(() => res.status(200).json({ message: 'Successfully registered. Please verify account' }))
      .catch((error) => next(error))
  }

  verify(req, res, next) {
    const { token } = req.data
    const verifyUserService = new VerifyUserService(token)

    verifyUserService.verify()
      .then(() => res.status(200).send(verifyUserService.getToken()))
      .catch((error) => next(error))
  }

  login(req, res, next) {
    const { email, password } = req.data
    const loginUserService = new LoginUserService(email, password)

    loginUserService.login()
      .then(() => res.status(200).json(loginUserService.getToken()))
      .catch((error) => next(error))
  }

  facebookLogin(req, res, next) {
    console.log('Facebook Login...')
    const { token } = req.data
    const facebookLoginService = new FacebookLoginService(token)

    facebookLoginService.login()
        .then(() => res.status(200).json(facebookLoginService.user.access_token))
        .catch((error) => next(error))
  }

  googleLogin(req, res, next) {
    console.log('Google Login...')
    const { token } = req.data    
    const googleLoginService = new GoogleLoginService(token)

    googleLoginService.login()
        .then(() => res.status(200).json(googleLoginService.getToken()))
        .catch((error) => next(error))
  }

  assignRole(req, res, next) {
    console.log('Assigning user role...')
    const { role } = req.data
    const assignRoleService = new AssignRoleService(req.user, role)

    assignRoleService.assign()
      .then(() => res.status(200).json(assignRoleService.getToken()))
      .catch((error) => next(error))
  }

  authorizeFromVerification(req, res, next) {
    const { token } = req.data
    const verifyUserService = new VerifyUserService(token)

    verifyUserService.authorize()
      .then(() => res.status(200).send({ message: 'Authorized from verification token' }))
      .catch((error) => next(error))
  }

  forgotPassword(req, res, next) {
    const { email } = req.data
    const resetPasswordService = new ResetPasswordService({ email })
    resetPasswordService.forgot()
      .then(() => res.status(200).json({ message: 'Successfully generated reset password token' }))
      .catch((error) => next(error))
  }

  resetPassword(req, res, next) {
    const { token, password } = req.data
    const resetPasswordService = new ResetPasswordService({ token, password })

    resetPasswordService.reset()
      .then(() => {
        res.status(200).json({ message: 'Successfully generated reset password token' })
      })
      .catch((error) => next(error))
  }

  validate(req, res) {
    console.log('Request authorized...')
    res.status(200).json(req.user)
  }

  logoff(req, res) {
    res.status(200).json({})
  }
}

module.exports = new AuthController()
