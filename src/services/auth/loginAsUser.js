const User = require('../../models/user')
const LoginUserService = require('./loginUser')
const GenerateTokenService = require('../auth/generateToken')
const UnauthorizedException = require('../../exception/unauthorized')

module.exports = class LoginAsUserService extends LoginUserService
{
    constructor(data) {
      super()
      this.id = data.id
      this.token = data.token
      this.admin = {}
    }

    async login() {
      await this.authorizeAdmin()
      await this.searchUser()
      await this.validateLogin()
      await this.generateAccessToken()
      await this.saveUser()
      await this.renewAdminToken()
      return this
    }

    // TODO this would be better done with a middleware and authorizing a bearer admin user
    async authorizeAdmin() {
      console.log('Authorizing admin...')
      this.admin = await User.findOne({ admin_token: this.token, role: 'admin' })
      
      if (User.notFound(this.admin) && !this.admin instanceof User) {
        throw new UnauthorizedException('Invalid token')
      }

      return this
    }

    async searchUser() {
      this.user = await User.findById(this.id).populate('artist').populate('contractor')
      return this
    }

    async validateLogin() {
      if (User.notFound(this.user)) {
        throw new UnauthorizedException('Invalid credentials provided')
      }

      if (! this.user.verification.is_verified) {
        throw new UnauthorizedException('User not verified')
      }

      return this
    }

    async renewAdminToken() {
      console.log('Updating admin grant token...')
      this.admin.admin_token = GenerateTokenService.generateSimple()
      console.log(this.admin)
      await this.admin.save()
      return this
    }
}
