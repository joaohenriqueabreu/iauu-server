const BadRequestException = require('../../exception/bad')
const BaseService = require('../base')


module.exports = class SaveProposalService extends BaseService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.proposal = data.proposal
      this.presentation = new 
    }

    async save() {
      await this.createPresentation()
      await this.populateModel()
      await this.saveArtist()
      return this
    }

    createPresentation() {

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
