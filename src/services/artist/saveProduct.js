const ArtistService = require('./base')

module.exports = class SaveProductService extends ArtistService
{
    constructor({ role_id }, { product }) {
      super()
      this.id = role_id
      this.product = product
    }

    async save() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()      
      await this.populateModel()
      await this.saveArtist()
      return this
    }

    populateModel() {
      this.artist.products.push(this.product)
      return this
    }
}
