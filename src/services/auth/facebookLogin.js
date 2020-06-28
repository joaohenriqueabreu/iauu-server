const SocialLoginService = require('./socialLogin')
const User = require('../../models/user')
const axios = require('axios')

module.exports = class FacebookLoginService extends SocialLoginService {
  constructor(token) {
    super(token)        
  }

  async fetchProfile() {    
    const { data } = await axios.get(
      `https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday&access_token=${this.token}`
    )

    if (data === undefined) {
      throw new Error('Unable to get user data from Facebook')
    }

    this.socialData = data
  }

  async lookupUserFromSocial() {
    await this.lookupUser({
      $or: [{ facebook_id: this.socialData.id }, { email: this.socialData.email }],
    })

    if (this.user === undefined || User.notFound(this.user)) {
      await this.populateFromSocialData()
      return this
    }

    if (this.user.facebook_id === undefined || this.user.facebook_id === null) {
      this.user.facebook_id = this.socialData.id
    }

    return this
  }

  async populateFromSocialData() {
    this.user = new User({
      email: this.socialData.email,
      name: this.socialData.name,
      password: this.socialData.id, // writing a "fake" pwd that will not be encrypted, but is required for saving
      facebook_id: this.socialData.id,
      photo: this.socialData.picture,
      is_verified: true,
    })

    return this
  }
}
