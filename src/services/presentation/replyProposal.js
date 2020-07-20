const _ = require('lodash')
const PresentationService = require('./base')

module.exports = class ReplyProposalService extends PresentationService
{
    constructor(user, data) {
      super(user, data)

      this.id = data.id
    }

    async reply() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      await this.ensureIsPartyToProposal()
      await this.populatePresentation()
      await this.savePresentation()
      return this
    }

    ensureIsPartyToProposal() {
      if (this.user.role_id !== this.presentation.artist.id && this.user.role_id !== this.presentation.contractor.id) {
        throw new UnauthorizedException('User is not party to presentation')
      }

      return this
    }
}
