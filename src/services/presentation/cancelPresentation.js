const _ = require('lodash')
const PresentationService = require('./base')
const BadRequestException = require('../../exception/bad')

module.exports = class CancelPresentationService extends PresentationService
{
    constructor(user, data) {
      super(user, data)

      this.id = data.id
    }

    async cancel() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      await this.ensurePresentationIsAccepted()
      await this.ensurePresentationIsNotPast()
      await this.populatePresentation()
      await this.savePresentation()
      return this
    }

    ensurePresentationIsAccepted() {
      if (this.presentation.status !== 'accepted') {
        throw new BadRequestException('Cannot close non accepted proposal')
      }

      return this
    }

    ensurePresentationIsNotPast() {
      return this
    }

    populatePresentation() {
      this.presentation.status = 'cancelled'
      return this
    }
}
