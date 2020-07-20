const ReplyCounterOfferService = require('./replyCounterOffer')

module.exports = class AcceptCounterOfferService extends ReplyCounterOfferService
{
    populateModel() {
      this.presentation.proposal.counterOffer.status = 'accepted'
      return this
    }
}
