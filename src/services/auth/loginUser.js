const AuthService   = require('./auth');
const User          = require('../../models/user')
const UnauthorizedException = require('../../exception/unauthorized')

module.exports = class AuthenticateUserService extends AuthService
{
    constructor(email, password) {
      super()
      this.email = email
      this.password = password
    }

    async login() {
      await this.lookupUser({ email: this.email })
      await this.validateLogin()
      await this.generateAccessToken()
      await this.renewLastLogin()
      await this.saveUser()
      return this
    }

    async validateLogin() {
      console.log(this.user)
      if (User.notFound(this.user)) {
        throw new UnauthorizedException('Invalid credentials provided')
      }

      if (! await this.validatePassword(this.password)) {
        throw new UnauthorizedException('Invalid credentials provided')
      }

      if (! this.user.verification.is_verified) {
        throw new UnauthorizedException('User not verified')
      }

      return this
    }

    renewLastLogin() {
      console.log('Updating last login...')
      this.user.last_logged_in = Date.now()
      return this
    }
}
