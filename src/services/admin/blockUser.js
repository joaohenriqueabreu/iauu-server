const UserService = require('./userBase')

module.exports = class BlockUserService extends UserService
{
    constructor(data) {
      super(data)
    }

    async block() {
      await this.searchUser()
      this.ensureUserWasFound()
      this.blockUser()
      await this.saveUser()
      return this
    }

    blockUser() {
      this.user.status = 'blocked'
      return this
    }
}
