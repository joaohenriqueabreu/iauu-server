const SocialLoginService = require('./socialLogin')
const User = require('../../models/user')
const axios = require('axios')

module.exports = class GoogleLoginService extends SocialLoginService {
  constructor(token) {
    super(token)    
  }

  async fetchProfile() {
    console.log('Trying to get Google profile...')
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${this.token}`
    )

    if (data === undefined) {
      throw new Error('Unable to get user data from Google')
    }

    this.socialData = data
  }

  async lookupUserFromSocial() {
    await this.lookupUser({
      $or: [{ google_id: this.socialData.sub }, { email: this.socialData.email }],
    })

    if (this.user === undefined || User.notFound(this.user)) {
      await this.populateFromSocialData()
      return this
    }

    if (this.user.google_id === undefined || this.user.google_id === null) {
      this.user.google_id = this.socialData.sub
    }

    return this
  }  

  async populateFromSocialData() {
    this.user = new User({
      email: this.socialData.email,
      name: this.socialData.name,
      password: this.socialData.sub,
      facebook_id: this.socialData.sub,
      photo: this.socialData.picture,
      verification: {
        is_verified: true
      }
    })

    return this
  }
}