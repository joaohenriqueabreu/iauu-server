"use strict";

const BaseController = require('./base')
const RegisterUserService = require('../services/auth/registerUser')
const AuthenticateUserService = require('../services/auth/authenticateUser')

class AuthController extends BaseController {
  register(req, res, next) {    
      console.log(req.body)
      const {name, email, password, role} = req.body
      const registerUserSvc = new RegisterUserService(name, email, password, role)       
      registerUserSvc.register()
        .then(() => { res.status(200).json(registerUserSvc.getToken()) })
        .catch(error => next(error))                                                               
  }

  login(req, res, next) {
    const {email, password} = req.body
    const authenticateUserService = new AuthenticateUserService(email, password)

    authenticateUserService.login()
      .then(() => { res.status(200).json(authenticateUserService.getToken())})
      .catch(error => next(error))        
  }

  validate(req, res) {        
    res.status(200).json(req.user)
  }

  resetPassword(req, res) {

  }
  
  logoff(req, res) {
    res.status(200).json({})
  }
}

module.exports = new AuthController