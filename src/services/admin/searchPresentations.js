const BaseService = require('../base')
const { Presentation } = require('../../models')

module.exports = class SearchPresentationsService extends BaseService
{
    constructor(data) {
      super(data)

      if (data.search) {
        this.term = data.search
      }

      this.presentatios = {}
    }

    async search() {
      await this.searchPresentations()
      return this
    }

    async searchPresentations() {
      const searchTermCondition = this.term !== undefined ? { $text: { $search: this.term } } : {}
      this.presentations = await Presentation.find(searchTermCondition)
        .populate({ path: 'contractor', populate: { path: 'user' }})
        .populate({ path: 'artist',  populate: { path: 'user' }})
        .sort('-created_at')
      return this
    }

    getPresentations() {
      return this.presentations
    }
}
