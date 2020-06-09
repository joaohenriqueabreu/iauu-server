const BaseService = require('../base')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const GenerateTokenService = require('./generateToken')

module.exports = class RegisterUserService extends BaseService {
  constructor(name, email, password, type) {
    super()
    this.user = new User({name, email, type})  
    console.log(this.user)    
    
    const hash = bcrypt.hashSync(password, 10);    
    this.user.password = hash        
  }

  async register() { 
    const exists = await User.exists({email: this.user.email})    
    if (exists) {        
      throw new Error('User exists')
    }
  
    await this.generateToken().saveData()            
    return this    
  }

  getToken() {
    return this.user.token
  }

  generateToken() {
    this.user.token = GenerateTokenService.generate(this.user)
    return this
  }

  async saveData() {
    await this.user.save()
    return this
  }
}