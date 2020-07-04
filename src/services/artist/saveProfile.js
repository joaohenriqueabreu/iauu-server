const Artist = require('../../models/artist')
const ArtistService = require('./base')
const SaveUserProfileService = require('../auth/saveProfile')
const BadRequestException = require('../../exception/bad')

const slugfy = (value) => {
  return value.toLowerCase().replace(' ', '-')
}

module.exports = class SaveArtistProfileService extends ArtistService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.data = data.profile
      this.userData = {}
    }

    async save() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      await this.sanitizeData()
      await this.populateSlug(0)
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
      delete this.data['slug']

      for (let prop in this.data) {
        if (this.data[prop] === undefined || this.data[prop] === this.artist[prop]) {
          delete this.data[prop]
        }
      }

      return this
    }

    async populateSlug(suffix) {
      if (this.data['company_name'] === undefined ||
        this.data['company_name'] === this.artist.company_name) {
        console.log('No name changes...')
        return this
      }

      let slug = slugfy(this.data['company_name'])

      // Assign suffix if any
      if (suffix > 0) {
        slug = `${slug}-${suffix}`
      }

      console.log(`Checking if slug ${slug} exists...`)
      // Verify if slug exists
      if (await Artist.exists({ slug })) {
        console.log('Found existing slug...')
        return this.populateSlug(++suffix)
      }

      this.artist.slug = slug
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
