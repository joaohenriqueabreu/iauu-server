const AuthService = require('./auth')
const { Artist, Contractor } = require('../../models')

module.exports = class AssignRoleService extends AuthService {
  constructor(data, role) {
    super()
    
    this.id = data.id
    this.role = role
    this.roleInstance = {}
  }

  async assign() {
    await this.searchUserById(this.id)
    await this.createRole()
    await this.saveRole()
    this.assignUserRole()
    await this.saveUser()
    await this.generateAccessToken()
    return this
  }

  async createRole() {
    this.user.role = this.role

    if (this.role === 'artist') {
      this.createArtist()
      return this
    }

    if (this.role === 'contractor') {
      this.createContractor()
      return this
    }    

    throw new Error('Invalid role provided...')
  }

  createArtist() {
    this.roleInstance = new Artist()
    return this
  }

  createContractor() {
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
