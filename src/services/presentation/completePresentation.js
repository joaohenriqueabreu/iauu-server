const _ = require('lodash')
const PresentationService = require('./base')
const BadRequestException = require('../../exception/bad')

module.exports = class CompletePresentationService extends PresentationService
{
    constructor(user, data) {
      super(user, data)

      this.id = data.id
    }

    async complete() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      await this.ensurePresentationIsAccepted()
      await this.populatePresentation()
      await this.savePresentation()

      // Trigger payment flow
      this.createPayment()
      return this
    }

    ensurePresentationIsAccepted() {
      if (this.presentation.status !== 'accepted') {
        throw new BadRequestException('Cannot close non accepted proposal')
      }

      return this
    }

    populatePresentation() {
      this.presentation.status = 'completed'
      return this
    }

    createPayment() {
      
    }
}
