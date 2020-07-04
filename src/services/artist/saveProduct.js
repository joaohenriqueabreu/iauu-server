const _ = require('lodash')
const ArtistService = require('./base')
const BadRequestException = require('../../exception/bad')

module.exports = class SaveProductService extends ArtistService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.product = data.product
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
      const self = this
      console.log(self.product)
      const index = _.findIndex(this.artist.products, (product) => product.id === self.product.id)

      if (index > -1) {
        this.artist.products[index] = this.product
        return this
      }

      this.artist.products.push(this.product)
      return this
    }
}
