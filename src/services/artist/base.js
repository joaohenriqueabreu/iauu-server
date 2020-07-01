const Artist = require('../../models/artist')
const BaseService = require('../base')

module.exports = class ArtistService extends BaseService
{
    constructor() {
      super()      
      this.artist = {}
    }

    getArtist() {
      return this.artist
    }

    getProducts() {
      return this.artist.products
    }

    async lookupArtist() {
      console.log('Searching for artist...')
      this.artist = await Artist.findById(this.id).populate('user')
      return this
    }

    ensureArtistWasFound() {      
      if (Artist.notFound(this.artist) || !this.artist instanceof Artist) {
        throw new Error('Artist not found...')
      }
  
      console.log('Artist found...')
      return this
    }

    async saveArtist() {      
      if (this.artist.isModified) {
        console.log(this.artist)
        await this.artist.save()
        console.log('Artist saved...')
      }
      
      return this
    }
}
