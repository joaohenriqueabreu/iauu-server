const Contractor = require('../../models/contractor')
const BaseService = require('../base')

module.exports = class ContractorService extends BaseService
{
    constructor({ id, role_id }) {
      super()
      this.id = role_id
      this.userId = id      
      this.contractor = {}
    }

    getContractor() {
      return this.contractor
    }

    async lookupMe() {
      console.log('Searching for contractor from user...')
      this.contractor = await Contractor.findOne({ user: this.userId }).populate('user')
      return this
    }

    async lookupContractor() {
      console.log('Searching for contractor...')
      this.contractor = await Contractor.findById(this.id).populate('user')
      return this
    }

    ensureContractorWasFound() {
      if (Contractor.notFound(this.contractor) || !this.contractor instanceof Contractor) {
        throw new Error('Contractor not found...')
      }
  
      console.log('Contractor found...')
      return this
    }

    async saveContractor() { 
      if (this.contractor.isModified) {
        await this.contractor.save()
        console.log('Contractor saved...')
      }
      
      return this
    }
}
