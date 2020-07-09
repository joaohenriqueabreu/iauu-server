const _ = require('lodash')
const PresentationService = require('./base')
const BadRequestException = require('../../exception/bad')

module.exports = class SelectTimeslotService extends PresentationService
{
    constructor(user, data) {
      super(user, data)

      this.id = data.id
      this.timeslot = data.timeslot
    }

    async select() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      await this.populateTimeslot()
      await this.savePresentation()
      return this
    }

    populateTimeslot() {
      this.presentation.timeslot = this.timeslot
      return this
    }
}
