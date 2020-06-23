const Artist = require('../../models/artist')
const BaseService = require('../base')

module.exports = class SearchProfileService extends BaseService
{
    constructor(id) {
      super()
      this.id = id
      this.artist = {}
    }

    async search() {
      await this.lookupArtist()
      return this
    }

    async lookupUser() {
      this.artist = await Artist.findById(this.id)      
      return this
    }

    getArtist() {
      return this.artist
    }
}
