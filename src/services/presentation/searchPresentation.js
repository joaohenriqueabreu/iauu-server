const BadRequestException = require('../../exception/bad')
const PresentationService = require('./base')
const Presentation = require('../../models/presentation')

module.exports = class SearchPresentationService extends PresentationService
{
    constructor(user, data) {
      super(user, data)

      this.id = data.id
    }

    async search() {
      await this.searchPresentation()
      await this.ensurePresentationWasFound()
      return this
    }
}
