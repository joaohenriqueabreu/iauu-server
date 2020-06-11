const AuthService = require('./auth')
const User        = require('../../models/user')
const SendMailService = require('../mail/sendMail')

module.exports = class RegisterUserService extends AuthService {
  constructor(name, email, password, role) {
    super()    
    this.user.email = email
    this.user.name = name
    this.user.role = role

    this.password = password    
  }  

  async checkUserExists() {
    const exists = await User.exists({email: this.user.email})    
    if (exists) {        
      throw new Error('User exists')
    }

    return this
  }  

  async sendRegistrationMail() {
    const mailSvc = new SendMailService(this.user.email, 'Welcome to Iauu', 'register', this.user)
    await mailSvc.sendMail()
  }

  async register() {     
    await this.checkUserExists()
    await this.encryptPassword(this.password)
    this.generateAccessToken().generateVerificationToken()
    await this.saveUser()
    await this.sendRegistrationMail()

    return this
  }
}