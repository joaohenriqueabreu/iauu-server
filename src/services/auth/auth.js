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
  }

  async validateUser(errorMessage) {
    if (User.notFound(this.user)) {
      throw new Error(`User not found: ${errorMessage}`)
    }

    return this
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
    this.user = await User.fetchOne(conditions)
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
}
