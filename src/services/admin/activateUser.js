const UserService = require('./userBase')
const BadRequestException = require('../../exception/bad')
const VerifyUserService = require('../auth/verifyUser')

module.exports = class BlockUserService extends UserService
{
    constructor(data) {
      super(data)
    }

    async activate() {
      await this.searchUser()
      this.ensureUserWasFound()
        .ensureUserCanBeActivated()
        .initVerifySvc()
        .activateUser()
      await this.saveUser()
      await this.verifyUser()
      return this
    }

    ensureUserCanBeActivated() {
      if (this.user.status === 'active') {
        throw new BadRequestException('User already active')
      }

      return this
    }

    initVerifySvc() {
      // Toggle bypass expiration - allow admins to verify user at anytime
      this.verifyUserSvc = new VerifyUserService(this.user.verification.token, true)
      return this
    }

    activateUser() {
      this.user.status = 'active'
      return this
    }

    async verifyUser() {
      await this.verifyUserSvc.verify()
      return this
    }
}
