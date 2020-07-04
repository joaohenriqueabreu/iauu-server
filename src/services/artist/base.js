const Artist = require('../../models/artist')
const BaseService = require('../base')

module.exports = class ArtistService extends BaseService
{
    constructor({ id, role_id }) {
      super()
      this.id = role_id
      this.userId = id      
      this.artist = {}
    }

    getArtist() {
      return this.artist
    }

    getProducts() {
      return this.artist.products
    }

    async lookupMe() {
      console.log('Searching for artist from user...')
      this.artist = await Artist.findOne({ user: this.userId }).populate('user')
      return this
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
        await this.artist.save()
        console.log('Artist saved...')
      }
      
      return this
    }
}
