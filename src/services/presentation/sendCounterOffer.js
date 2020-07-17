const _ = require('lodash')
const BadRequestException = require('../../exception/bad')
const PresentationService = require('./base')
const SendMailService = require('../mail/sendMail')
const CreateNotificationService = require('../notification/createNotification')
const Presentation = require('../../models/presentation')

module.exports = class SendCounterOfferService extends PresentationService
{
    constructor(user, data) {
      super(user, data)
      
      this.id = data.id
      this.counterOffer = data.counterOffer
    }

    async send() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      await this.ensureProposal()
      await this.ensureCounterOfferIsNotAccepted()
      await this.populateModel()
      await this.savePresentation()

      this.sendMail()
      this.createNotification()
      return this
    }

    ensureProposal() {
      if (this.presentation.status !== 'proposal') {
        throw new BadRequestException('Cannot save counter offer for non proposal')
      }

      return this
    }

    ensureCounterOfferIsNotAccepted() {
      if (this.presentation.proposal.counterOffer !== undefined && this.presentation.proposal.counterOffer.status === 'accepted') {
        throw new BadRequestException('Counter offer already accepted')
      }

      return this
    }

    populateModel() {
      this.presentation.proposal.counterOffer = this.counterOffer
      this.presentation.proposal.counterOffer.status = 'pending'
      return this
    }

    sendMail() {
      console.log('Sending proposal mail...')
    }

    createNotification() {
      console.log('Creating proposal notification...')
    }
}
