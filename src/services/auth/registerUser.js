const AuthService = require('./auth')
const { User, Artist, Contractor } = require('../../models')
const SendMailService = require('../mail/sendMail')

module.exports = class RegisterUserService extends AuthService {
  constructor(name, email, password) {
    super()
    
    if (!name || !email || !password) {
      throw new Error('Invalid user info...')
    }

    this.user.email = email
    this.user.name = name    

    this.password = password    
  }

  async register() {    
    await this.checkUserExists()
    await this.encryptPassword(this.password)
    await this.generateAccessToken()
    await this.generateVerificationToken()
    await this.saveUser()    

    // Do not await for send mail, just start process, it is taking >3s to complete
    this.sendRegistrationMail()
    console.log('Registered user...')
    return this
  }

  async checkUserExists() {
    const exists = await User.exists({ email: this.user.email })    
    if (exists) {        
      throw new Error('User exists...')
    }

    return this
  }    

  async sendRegistrationMail() {
    const mailSvc = new SendMailService(this.user.email, 'iauu | Verifique sua conta')
    await mailSvc.buildBody('register', {user: this.user, url: this.user.generateVerificationUrl() })
    await mailSvc.send()    
    return this
  }
}