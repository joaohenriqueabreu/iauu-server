"use strict";

const BaseController = require('./base')
const RegisterUserService = require('../services/auth/registerUser')
const AuthenticateUserService = require('../services/auth/authenticateUser')
const errorMiddleware = require('../middleware/error')

class AuthController extends BaseController {
  register(req, res, next) {    
      console.log(req.body)
      const {name, email, password, type} = req.body
      const registerUserSvc = new RegisterUserService(name, email, password, type)       
      registerUserSvc.register()
        .then(() => { res.status(200).json(registerUserSvc.getToken()) })
        .catch(error => { return next(error) })                                                               
  }

  login(req, res) {
    const {email, password} = req.body
    const token = (new LoginUserService(email, password)).login()
    res.status(200).json(token)
  }

  validate(req, res) {    
    const token = req.headers.authorization.replace('Bearer ', '')          
    const { type } = jwt.decode(token, process.env.AUTH_SECRET)
    sessionUserType = type
    res.status(200).json(new User(type))
  }
  
  logoff(req, res) {
    res.status(200).json({})
  }
}

module.exports = new AuthController