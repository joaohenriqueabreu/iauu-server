const bcrypt = require('bcryptjs')
const BaseService = require('../base')
const { User, Artist, Contractor } = require('../../models')
const GenerateTokenService = require('./generateToken')
const SendMailService = require('../mail/sendMail')

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

    this.payload = {}
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

  getPayload() {
    return this.payload
  }

  async generateAccessToken() {
    this.user.access_token = await GenerateTokenService.generateForUser(this.user)
    return this
  }

  generateVerificationToken() {
    this.user.verification.token = GenerateTokenService.generateSimple()
    return this
  }  

  async generateUserPayload() {    
    this.payload = await GenerateTokenService.getUserPayload(this.user)    
    return this
  }

  async lookupUserById(id) {
    this.user = await User.fetchWithSensitiveDataById(id)
    return this
  }

  async lookupUser(conditions) {
    this.user = await User.fetchWithSensitiveData(conditions)
    return this
  }

  async searchUserById(id) {
    this.user = await User.findById(id)
      .select('+password +access_token +verification')
      .populate('artist')
      .populate('contractor')
    
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
    console.log('Trying to save user...')    
    if (this.user.isModified) {      
      await this.user.save()
      console.log('User updated...')
    }

    return this
  }

  async sendMail() {
    const mailSvc = new SendMailService(this.user.email, this.mail.subtitle)
    await mailSvc.buildBody(this.mail.template, this.mail.data)
    await mailSvc.send()
    return this
  }

  async sendRegistrationMail() {
    const mailSvc = new SendMailService(this.user.email, 'iauu | Verifique sua conta')
    await mailSvc.buildBody('register', {user: this.user, url: this.user.generateVerificationUrl() })
    await mailSvc.send()    
    return this
  }
}
