const AuthService   = require('./auth');
const User          = require('../../models/user')

module.exports = class AuthenticateUserService extends AuthService
{
    constructor(email, password) {
      super()
      this.email = email
      this.password = password
    }

    async login() {
      await this.lookupUser()
      await this.validateLogin()
      this.generateAccessToken()
      await this.saveUser()

      return this
    }

    async lookupUser() {
      this.user = await User.fetchOne({email: this.email})      
      return this
    }

    async validateLogin() {
      if (User.notFound(this.user)) {
        throw new Error('Invalid credentials provided')
      }

      if (! await this.validatePassword(this.password)) {
        throw new Error('Invalid credentials provided')
      }

      return this
    }
}
