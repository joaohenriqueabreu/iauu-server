const AuthService = require('./auth')
const User = require('../../models/user')
const SendMailService = require('../mail/sendMail')

module.exports = class ResetPasswordService extends AuthService {
  constructor(email, password) {
    super()
    this.email = email
    this.newPassword = password
  }

  async forgot() {
    console.log('Starting forgot password processing...')
    await this.lookupUser({ email: this.email })
    await this.validateUser('Invalid Email provided')
    await this.generateVerificationToken()
    await this.saveUser()

    this.sendForgotPasswordMail()
    return this
  }

  async reset() {
    console.log('Trying to verify...')
    await this.lookupUser()
    await this.validateLogin()
    await this.generateAccessToken()
    await this.setUserAsVerified()
    await this.saveUser()

    this.sendWelcomeMail()
    return this
  }

  async sendForgotPasswordMail() {
    const mailSvc = new SendMailService(this.user.email, 'Trocar sua senha')
    await mailSvc.buildBody('forgot', {
      user: this.user,
      url: this.user.generateResetPasswordUrl(),
    })
    await mailSvc.send()
    return this
  }
}
