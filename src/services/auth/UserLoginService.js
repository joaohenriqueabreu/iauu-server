const BaseService   = require('../BaseService');
const faker         = require('faker');
const User          = require('./models/user')

module.exports = class UserLoginService extends BaseService
{
    constructor(email, password) {
      this.email = email
      this.password = password
    }

    login() {

    }

    validateLogin() {
      
    }
}
