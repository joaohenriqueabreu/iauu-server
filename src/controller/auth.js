const BaseController = require('./base')
const RegisterUserService = require('../services/auth/registerUser')
const AuthenticateUserService = require('../services/auth/authenticateUser')

class AuthController extends BaseController {
  register(req, res) {    
      const {name, email, password} = req.body
      const token = (new RegisterUserService(name, email, password)).register()    
      res.status(200).json(token)    
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