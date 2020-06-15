const AuthService = require('./auth')
const User = require('../../models/user')
const SendMailService = require('../mail/sendMail')

module.exports = class VerifyUserService extends AuthService {
  constructor(token) {
    super()
    this.token = token
  }

  async verify() {
    console.log('Trying to verify...')
    await this.lookupUser({ verification_token: this.token })
    await this.validateLogin()
    await this.generateAccessToken()
    await this.setUserAsVerified()
    await this.saveUser()

    this.sendWelcomeMail()
    return this
  }

  async authorize() {
    console.log('Trying to verify...')
    await this.lookupUser({ verification_token: this.token })
    await this.validateLogin()
    return this
  }  

  async validateLogin() {
    if (User.notFound(this.user)) {
      throw new Error('Invalid token or expired')
    }

    return this
  }

  setUserAsVerified() {
    this.user.is_verified = true
  }

  async sendWelcomeMail() {
    const mailSvc = new SendMailService(this.user.email, 'Welcome to Iauu')
    await mailSvc.buildBody('welcome', {
      user: this.user,
      url: this.user.generateVerificationUrl(),
    })
    await mailSvc.send()
    return this
  }
}
