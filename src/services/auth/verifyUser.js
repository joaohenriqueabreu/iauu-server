const moment = require('moment')
const AuthService = require('./auth')
const User = require('../../models/user')
const SendMailService = require('../mail/sendMail')
const BadRequestException = require('../../exception/bad')
const UnauthorizedException = require('../../exception/unauthorized')

module.exports = class VerifyUserService extends AuthService {
  constructor(token) {
    super()
    this.token = token
  }

  async verify() {
    console.log('Trying to verify...')
    await this.lookupUser({ 'verification.token': this.token })
    await this.validateLogin()
    this.isTokenExpired()
    await this.generateAccessToken()
    await this.setUserAsVerified()
    await this.saveUser()

    this.sendWelcomeMail()
    return this
  }

  async resend() {
    console.log('Resending verification token...')
    await this.lookupUser({ 'verification.token': this.token })
    await this.validateLogin()
    this.generateVerificationToken()
      .renewIssueDt()
    await this.saveUser()

    this.sendRegistrationMail()
    return this
  }

  async authorize() {
    console.log('Trying to verify...')
    await this.lookupUser({ 'verification.token': this.token })
    await this.validateLogin()
    return this
  }  

  async validateLogin() {
    if (User.notFound(this.user)) {
      throw new BadRequestException('Invalid token')
    }

    return this
  }

  isTokenExpired() {
    const now = moment()
    const tokenIssueDt = moment(this.user.verification.issued_at)
    console.log('Verifying token expiration date...')
    if (now.diff(tokenIssueDt, 'days') > 1) {
      throw new UnauthorizedException('Token expired')
    }

    return this
  }

  renewIssueDt() {
    this.user.verification.issued_at = Date.now()
    return this
  }

  setUserAsVerified() {
    this.user.verification.is_verified = true
    return this
  }

  async sendWelcomeMail() {
    const mailSvc = new SendMailService(this.user.email, 'Bem vindo a iauu')
    await mailSvc.buildBody('welcome', {
      user: this.user,
      url: this.user.generateVerificationUrl(),
    })
    await mailSvc.send()
    return this
  }
}
