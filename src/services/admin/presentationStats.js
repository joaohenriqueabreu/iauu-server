const BaseService = require('../base')
const { User, Presentation } = require('../../models')

module.exports = class UsersService extends BaseService
{
    constructor(data) {
      super()
      this.id = data.id
      this.user = {}
      this.stats = {}
    }

    async retrieve() {
      await this.searchUser()
      this.ensureUserWasFound()
      await this.calculateStats()
      return this
    }

    async searchUser() {
      this.user = await User.findById(this.id)
      return this
    }

    ensureUserWasFound() {
      if (User.notFound(this.user) || !this.user instanceof User) {
        throw new Error('User not found...')
      }
  
      console.log('User found...')
      return this
    }

    async calculateStats() {
      const roleQuery = this.user.role === 'artist' ? { artist: this.user.artist } : { contractor: this.user.contractor }
      this.stats = await Presentation.aggregate([{ $match: roleQuery}]).facet({
        presentations: [{ $count: "count" }],
        proposals: [{ $match: { status: 'proposal'}}, { $count: 'count' }],
        rejected: [{ $match: { status: 'rejected'}}, { $count: 'count' }],
        accepted: [{ $match: { status: 'accepted'}}, { $count: 'count' }],
        completed: [{ $match: { status: 'completed'}}, { $count: 'count' }],
        cancelled: [{ $match: { status: 'cancelled'}}, { $count: 'count' }]
      })

      return this
    }

    getUser() {
      return { 
        user: this.user,
        stats: this.stats
      }
    }
}
