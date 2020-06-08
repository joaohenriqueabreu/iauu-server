const BaseService = require('../base')
const User = require('../../models/user')

module.exports = class RetrieveUserService extends BaseService {
  constructor(userData) {
    this.data = userData
  }

  retrieve() {
    
  }
}