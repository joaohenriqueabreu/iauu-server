const AuthService = require('./auth')

module.exports = class SaveUserProfileService extends AuthService
{
    constructor(user, data) {
      super(user)
      this.user = user
      this.data = data
    }

    async save() {      
      await this.validateUser()
      await this.sanitizeData()
      await this.populateModel()
      await this.saveUser()
      return this
    }

    sanitizeData() {
      // Don't update sensitive data
      delete this.data['_id']
      delete this.data['role']
      delete this.data['artist']
      delete this.data['contractor']
      delete this.data['email']
      delete this.data['date_created']
      delete this.data['__v']
      return this
    }

    populateModel() {
      for (let prop in this.data) {
        this.user[prop] = this.data[prop]
      }      
            
      console.log('User ready to save...')
      return this
    }
}
