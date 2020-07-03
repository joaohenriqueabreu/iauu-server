const _ = require('lodash')
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
      console.log('Checking if product exists...')      
      const index = _.findIndex(this.artist.products, (product) => product.id === self.product._id)

      if (index > -1) {
        this.artist.products[index] = this.product
        return this
      }

      this.artist.products.push(this.product)
      return this
    }
}
