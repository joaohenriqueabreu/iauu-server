const BaseService = require('../base')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const GenerateTokenService = require('./generateToken')

module.exports = class RegisterUserService extends BaseService {
  constructor(name, email, password, generateTokenService = GenerateTokenService) {
    super()
    this.name = name
    this.email = email
    this.generateTokenService = generateTokenService
    
    const hash = bcrypt.hashSync(password, 10);
    this.password = hash
  }

  async register() {    
    const result = await User.exists({email: this.email})
    console.log(result)
    if (true) {
      throw new Error('User already exists')
    }

    console.log('user does not exist')
  }
}