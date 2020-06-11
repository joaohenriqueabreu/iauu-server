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
    const mailSvc = new SendMailService(this.user.email, 'Welcome to Iauu')
    await mailSvc.buildBody('register', this.user)
    await mailSvc.send()    
    return this
  }

  async register() {  
    // TODO Testing code
    await User.deleteOne({email: this.user.email})   
    await this.checkUserExists()
    await this.encryptPassword(this.password)
    this.generateAccessToken().generateVerificationToken()
    await this.saveUser()

    // Do not await for send mail, just start process, it is taking >3s to complete
    this.sendRegistrationMail()
    console.log('Registered user...')
    return this
  }
}