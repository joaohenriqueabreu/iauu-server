const AuthService = require('./auth')
const User = require('../../models/user')
const SendMailService = require('../mail/sendMail')

module.exports = class ResetPasswordService extends AuthService {
  constructor({email, token, password}) {
    super()
    this.email = email
    this.token = token
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
    console.log('Renewing password...')     
    await this.lookupUser({ 'verification.token': this.token })   
    await this.validateUser('Invalid token provided')
    await this.encryptPassword(this.newPassword) 
    await this.resetVerificationToken()
    await this.saveUser()

    this.sendPwdChangedMail()
    return this
  }

  resetVerificationToken() {
    this.user.verification.token = null
    return this
  }

  async sendPwdChangedMail() {
    this.mail = {
      subject: 'Senha atualizada',
      template: 'resetPassword',
      data: this.user      
    }
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
