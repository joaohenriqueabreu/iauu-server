const Artist = require('../../models/artist')
const BaseService = require('../base')

module.exports = class SearchArtistProfileService extends BaseService
{
    constructor({ term }) {
      super()
      this.term = term
      this.artists = []
    }

    async search() {
      await this.lookupArtists()
      return this
    }

    async lookupArtists() {
      console.log('Searching for artists by term...')
      const condition = this.term !== undefined
        ? {$text: { $search: this.term }}
        : {}
      this.artists = await Artist.find(condition).populate('user')
      console.log('Found artists...')
      return this
    }

    getArtists() {
      return this.artists
    }
}
