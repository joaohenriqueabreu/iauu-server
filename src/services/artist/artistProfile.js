const Artist = require('../../models/artist')
const ArtistService = require('./base')

module.exports = class ArtistProfileService extends ArtistService
{
    constructor({profile}) {
      super()
      const { _id } = profile
      this.id = _id
      this.data = profile      
    }

    async save() {
      await this.lookupArtist()
      await this.ensureDataIsConsistent()
      await this.sanitizeData()
      await this.populateModel()
      await this.saveArtist()
      return this
    }

    async lookupArtist() {
      console.log('Searching for artist...')      
      this.artist = await Artist.findById(this.id)      
      console.log('Found artist...')      
      return this
    }

    ensureDataIsConsistent() {
      return this
    }

    sanitizeData() {
      console.log('Data cleanup...')      
      // Clenup sensitive data, null or not changed data
      delete this.data['user']
      delete this.data['_id']

      for (let prop in this.data) {
        if (this.data[prop] === undefined || this.data[prop] === this.artist[prop]) {
          delete this.data[prop]
        }
      }
      
      return this
    }

    populateModel() {
      for (let prop in this.data) {
        this.artist[prop] = this.data[prop]
      }
      
      console.log('Artist ready to save...')
      console.log(this.artist)
      return this
    }

    async saveArtist() {
      console.log('Saving artist...')
      if (this.artist.isModified) {
        await this.artist.save()
      }

      console.log('Artist saved...')
      return this
    }
}
