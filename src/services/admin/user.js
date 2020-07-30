const BaseService = require('../base')
const { User } = require('../../models')

module.exports = class UserService extends BaseService
{
    constructor(data) {
      super()
      this.id = data.id
      this.user = {}
    }

    async search() {
      await this.searchUser()
      await this.ensureUserWasFound()
      return this
    }

    async searchUser() {
      this.user = await User.findById(this.id)
        .select('+access_token +verification.token')
        .populate('artist')
        .populate('contractor')
      return this
    }

    ensureUserWasFound() {
      if (User.notFound(this.user) || !this.user instanceof User) {
        throw new Error('User not found...')
      }
  
      console.log('User found...')
      return this
    }

    async saveUser() {
      console.log('Trying to save user...')    
      if (this.user.isModified) {
        await this.user.save()
        console.log('User updated...')
      }
  
      return this
    }

    getUser() {
      return this.user
    }
}
