const _ = require('lodash')
const ReplyProposalService = require('./replyProposal')
const BadRequestException = require('../../exception/bad')

module.exports = class RejectProposalService extends ReplyProposalService
{
  ensureCanReplyProposal() {
    // ensurePresentationHasTimeslot
    if (this.presentation.timeslot === undefined || this.presentation.timeslot === null) {
      throw new BadRequestException('Please select a timeslot before accepting a proposal')
    }

    return this
  }

  populatePresentation() {
    this.presentation.status = 'accepted'

    // Presentation price and duration
    // If there is a product, copy value from the product, otherwise look for a counter offer
    if (this.presentation.product !== undefined && !this.presentation.product.custom) {
      this.presentation.price = this.presentation.product.price
      this.presentation.duration = this.presentation.product.duration
      return this
    }

    if (this.presentation.counterOffer !== undefined && this.presentation.counterOffer.status === 'accepted') {
      this.presentation.price = this.presentation.counterOffer.price
      this.presentation.duration = this.presentation.counterOffer.duration
      return this
    }

    throw new BadRequestException('Cannot accept presentation without an agreed price and duration')
  }
}
