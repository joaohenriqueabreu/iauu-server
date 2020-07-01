const Artist = require('../../models/artist')
const ArtistService = require('./base')

module.exports = class SearchArtistProfileService extends ArtistService
{
    constructor(id) {
      super()
      this.id = id      
    }

    async search() {
      await this.lookupArtist()
      return this
    }

    async lookupArtist() {
      console.log('Searching for artist with...')      
      this.artist = await Artist.findOne({ user: this.id })
        .populate('user')      
      console.log('Found artist...')
      return this
    }
}
