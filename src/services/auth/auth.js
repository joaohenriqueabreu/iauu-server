const bcrypt = require('bcryptjs')
const BaseService = require('../base')
const User = require('../../models/user')
const GenerateTokenService = require('./generateToken')

module.exports = class AuthService extends BaseService {
  constructor() {
    super()
    if (this.constructor === AuthService) {
      throw new TypeError('Cannot construct abstract class')
    }

    this.user = new User()
    this.mail = {
      subject: null,
      template: null,
      data: null
    }
  }

  async validateUser(errorMessage) {
    if (User.notFound(this.user)) {
      throw new Error(`User not found: ${errorMessage}`)
    }

    console.log('User found...')

    return this
  }

  getUser() {
    return this.user
  }

  getToken() {
    return this.user.access_token
  }

  generateAccessToken() {
    this.user.access_token = GenerateTokenService.generateForUser(this.user)
    return this
  }

  generateVerificationToken() {
    this.user.verification_token = GenerateTokenService.generateSimple()
    return this
  }

  async lookupUser(conditions) {
    this.user = await User.fetchOne(conditions, 'email name access_token verification_token password')
    return this
  }

  async encryptPassword(password) {
    const hash = await bcrypt.hashSync(password, 2)
    this.user.password = hash
  }

  async validatePassword(password) {
    const result = await bcrypt.compare(password, this.user.password)
    return result
  }

  async saveUser() {
    if (this.user.isModified) {
      await this.user.save()
    }

    return this
  }

  async sendMail() {
    const mailSvc = new SendMailService(this.user.email, this.mail.subtitle)
    await mailSvc.buildBody(this.mail.template, this.mail.data)
    await mailSvc.send()
    return this
  }
}
