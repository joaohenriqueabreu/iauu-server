const AuthService = require('./auth')
const { User, Artist, Contractor } = require('../../models')

module.exports = class RegisterAdminUserService extends AuthService {
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
    this.populateAdminInfo()
    await this.generateAccessToken()
    await this.saveUser()    

    console.log('Registered admin user...')
    return this
  }

  populateAdminInfo() {
    this.user.role = 'admin'
    this.user.verification.is_verified = true
    return this
  }

  async checkUserExists() {
    const exists = await User.exists({ email: this.user.email })    
    if (exists) {        
      throw new Error('User exists...')
    }

    return this
  }
}