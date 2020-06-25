const AuthService = require('./auth')
const { User, Artist, Contractor } = require('../../models')
const SendMailService = require('../mail/sendMail')

module.exports = class RegisterUserService extends AuthService {
  constructor(name, email, password, role) {
    super()
    
    if (!name || !email || !password || !role) {
      throw new Error('Invalid user info...')
    }

    this.user.email = email
    this.user.name = name
    this.user.role = role

    this.password = password    
  }  

  async checkUserExists() {
    const exists = await User.exists({email: this.user.email})    
    if (exists) {        
      throw new Error('User exists...')
    }

    return this
  }
  
  async createUserRole() {
    if (this.user.role === 'artist') {
      await this.createArtist()
      return this
    }

    if (this.user.role === 'contractor') {
      await this.createContractor()
      return this
    }

    throw new Error('Invalid role provided...')
  }

  async createArtist() {
    let artist = new Artist()
    artist.user = this.user.id

    await artist.save()
    return this
  }

  async createContractor() {
    let contractor = new Contractor()
    contractor.user = this.user.id

    await contractor.save()
    return this
  }

  async sendRegistrationMail() {
    const mailSvc = new SendMailService(this.user.email, 'IAUU | Verifique sua conta')
    await mailSvc.buildBody('register', {user: this.user, url: this.user.generateVerificationUrl() })
    await mailSvc.send()    
    return this
  }

  async register() {    
    await this.checkUserExists()
    await this.encryptPassword(this.password)
    await this.generateAccessToken()
    await this.generateVerificationToken()
    await this.saveUser()
    await this.createUserRole()

    // Do not await for send mail, just start process, it is taking >3s to complete
    this.sendRegistrationMail()
    console.log('Registered user...')
    return this
  }
}