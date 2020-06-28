const AuthService = require('./auth')
const User = require('../../models/user')

module.exports = class SocialLogin extends AuthService {
  constructor(token) {
    super()
    this.token = token
    this.socialData = {}    
  }

  async login() {
    await this.fetchProfile()
    await this.lookupUserFromSocial()        
    await this.saveUser()
    await this.generateAccessToken()
    return this
  }  
}
