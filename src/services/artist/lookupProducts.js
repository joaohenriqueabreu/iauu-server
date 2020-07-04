const Artist = require('../../models/artist')
const ArtistService = require('./base')

module.exports = class SaveProfileService extends ArtistService
{
    constructor(user, data) {
      super(user)      
    }

    async lookup() {
      await this.lookupArtistWithProducts()
      await this.ensureArtistWasFound()
      return this
    }

    async lookupArtistWithProducts() {
      console.log('Searching for products...')
      this.artist = await Artist.findOne({ $or: [{ _id: this.artistId }, { user: this.userId }] })
        .populate('products')

      return this
    }
}
