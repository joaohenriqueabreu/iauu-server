const Artist = require('../../models/artist')
const ArtistService = require('./base')

module.exports = class SearchProfileService extends ArtistService
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
      this.artist = await await Artist.fetchOneWith({ user: this.id }, ['user'])
      console.log(this.artist)      
      console.log('Found artist...')
      return this
    }
}
