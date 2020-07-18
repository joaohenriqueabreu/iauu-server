const _ = require('lodash')
const BadRequestException = require('../../exception/bad')
const BaseService = require('../base')
const Presentation = require('../../models/presentation')

module.exports = class SearchProposalsService extends BaseService
{
    constructor(user, data) {
      super(user)

      this.id = user.role_id
      this.role = user.role
      this.presentations = []
    }

    async search() {
      const roleCondition = this.role.includes('artist') ? { artist: this.id } : { contractor: this.id }
      this.presentations = await Presentation.find({ ...roleCondition, status: { $in: ['proposal'] }})
        .populate({ path: 'contractor', populate: { path: 'user' }})
        .populate({ path: 'artist', populate: 'user' })

      return this
    }

    getPresentations() {
      return this.presentations
    }
}
