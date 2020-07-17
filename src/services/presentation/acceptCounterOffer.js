const _ = require('lodash')
const BadRequestException = require('../../exception/bad')
const PresentationService = require('./base')
const SendMailService = require('../mail/sendMail')
const CreateNotificationService = require('../notification/createNotification')
const Presentation = require('../../models/presentation')
const SendCounterOfferService = require('./sendCounterOffer')

module.exports = class AcceptCounterOfferService extends SendCounterOfferService
{
    async accept() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      await this.ensureProposal()
      await this.ensureCounterOfferExists()
      await this.ensureCounterOfferIsNotAccepted()
      await this.populateModel()
      await this.savePresentation()

      this.sendMail()
      this.createNotification()
      return this
    }

    ensureCounterOfferExists() {
      if (this.presentation.proposal.counterOffer === undefined || this.presentation.proposal.counterOffer === null) {
        throw new BadRequestException('Counter offer does not exists')
      }

      return this
    }

    populateModel() {
      this.presentation.proposal.counterOffer.status = 'accepted'
      return this
    }
}
