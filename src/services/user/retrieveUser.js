const BaseService = require('../base')
const User = require('../../models/user')

module.exports = class RetrieveUserService extends BaseService {
  constructor(userFilters) {
    super()
    this.filters = userFilters
    this.user = null
  }

  async retrieve() {    
    this.user = await User.fetchOne(this.filters)

    if (User.notFound(this.user)) {
      throw new Error('User not found')
    }    

    return this
  }

  getUser() {
    return this.user
  }
}