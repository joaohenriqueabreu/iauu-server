const ReplyCounterOfferService = require('./replyCounterOffer')

module.exports = class RejectCounterOfferService extends ReplyCounterOfferService
{
    populateModel() {
      this.presentation.proposal.counterOffer.status = 'rejected'
      return this
    }
}
