const Artist = require('../../models/artist')
const ArtistService = require('./base')
const SaveUserProfileService = require('../auth/saveProfile')

module.exports = class SaveArtistProfileService extends ArtistService
{
    constructor({ profile }) {
      super()
      const { _id } = profile
      this.id = _id
      this.data = profile
      this.userData = {}
    }

    async save() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      await this.sanitizeData()
      await this.populateModel()
      await this.saveArtist()
      await this.updateUser()
      return this
    }

    async lookupArtist() {
      console.log('Searching for artist...')
      this.artist = await Artist.findById(this.id).populate('user')
      return this
    }

    sanitizeData() {
      console.log('Data cleanup...')
      // Separate user data (ie: media), will be updated later
      this.userData = this.data['user']

      // Clenup sensitive data, null or not changed data
      delete this.data['user']
      delete this.data['_id']
      delete this.data['__v']

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
      return this
    }

    async updateUser() {
      // Check if we need to save something
      console.log('Checking if user needs saving...')
      if (this.artist.user.photo === this.userData.photo) { 
        return
      }
      console.log('User needs saving...')
      const saveUserProfileService = new SaveUserProfileService(this.artist.user, this.userData)
      await saveUserProfileService.save()
      return this      
    }
}
