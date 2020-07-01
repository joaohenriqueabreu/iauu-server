const Artist = require('../../models/artist')
const ArtistService = require('./base')

module.exports = class SaveProfileService extends ArtistService
{
    constructor(id) {
      super()
      this.id = id
    }

    async lookup() {
      await this.lookupArtistWithProducts()
      await this.ensureArtistWasFound()      
      return this
    }

    async lookupArtistWithProducts() {
      console.log('Searching for products...')
      this.artist = await Artist
        .findOne({ $or: [{ _id: this.id }, { user: this.id }] })
        .populate('products')

      return this
    }
}
