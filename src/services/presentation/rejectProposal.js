const _ = require('lodash')
const ReplyProposalService = require('./replyProposal')

module.exports = class RejectProposalService extends ReplyProposalService
{
    populatePresentation() {
      this.presentation.status = 'rejected'
      return this
    }
}