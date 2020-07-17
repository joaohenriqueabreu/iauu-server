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
      await this.ensureCanReplyProposal()
      await this.populatePresentation()
      await this.savePresentation()
      return this
    }

    ensureCanReplyProposal() {
      return this
    }
}
