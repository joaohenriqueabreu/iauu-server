const AuthService = require('./auth')
const { Artist, Contractor } = require('../../models')

module.exports = class AssignRoleService extends AuthService {
  constructor(payload, role) {
    super()
    
    this.userPayload = payload
    this.role = role
    this.roleInstance = {}
  }

  async assign() {
    await this.lookupUserById(this.userPayload.id)
    await this.createRole()
    await this.saveRole()
    await this.assignUserRole()
    await this.generateAccessToken()
    await this.saveUser()    
    return this
  }

  async createRole() {
    this.user.role = this.role

    if (this.role === 'artist') {
      await this.createArtist()
      return this
    }

    if (this.role === 'contractor') {
      await this.createContractor()
      return this
    }    

    throw new Error('Invalid role provided...')
  }

  async createArtist() {
    this.roleInstance = new Artist()    
    return this
  }

  async createContractor() {
    this.roleInstance = new Contractor()
    return this
  }

  async saveRole() {    
    this.roleInstance.user = this.user.id
    await this.roleInstance.save()
    return this
  }

  assignUserRole() {    
    if (this.role === 'artist') {
      console.log('Assigning user as artist...')
      this.user.artist = this.roleInstance.id
      return this
    }

    if (this.role === 'contractor') {
      console.log('Assigning user as contractor...')
      this.user.contractor = this.roleInstance.id
      return this
    }

    throw new Error('No role assigned')    
  }
}
