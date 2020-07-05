const BadRequestException = require('../../exception/bad')
const BaseService = require('../base')
const Presentation = require('../../models/presentation')
const timeslotSchema = require('../../models/schemas/timeslot')

module.exports = class SaveProposalService extends BaseService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.user = user
      this.proposal = data.proposal
    }

    async save() {
      await this.ensureProposedTimeslotsDontOverlap()
      await this.createPresentation()
      await this.populateModel()
      await this.savePresentation()
      return this
    }

    ensureProposedTimeslotsDontOverlap() {
      return this
    }

    createPresentation() {
      this.presentation = new Presentation()
      this.presentation.status = 'proposal'
      this.contractor = this.user.role_id
      return this
    }

    populateModel() {
      this.presentation.artist = this.proposal.artist.id
      this.presentation.address = this.proposal.location

      // delete from incoming data so it's not copied inside model
      delete this.proposal.artist
      delete this.proposal.location

      this.presentation.proposal = this.proposal
      return this
    }

    async savePresentation() {
      await this.presentation.save()
      return this
    }
}
