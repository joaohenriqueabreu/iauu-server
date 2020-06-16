const AuthService = require('./auth')
const User = require('../../models/user')
const axios = require('axios')

module.exports = class FacebookLoginService extends AuthService {
  constructor(token) {
    super()
    this.token = token
    this.socialData = {}    
  }

  async login() {
    await this.fetchProfile()
    await this.lookupUser({
      $or: [{ google_id: this.socialData.sub }, { email: this.socialData.email }],
    })
    await this.registerNewUser()
    await this.saveUser()
    await this.generateUserPayload()

    return this
  }

  async fetchProfile() {
    console.log('Trying to get Google profile...')
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${this.token}`
    )

    if (data === undefined) {
      throw new Error('Unable to get user data from Facebook')
    }

    this.socialData = data
  }

  async registerNewUser() {
    if (!User.notFound(this.user)) {
      console.log('Found user')            
      console.log(this.user.google_id)
      if (this.user.google_id === undefined || this.user.google_id === null) {
        this.user.google_id = this.socialData.sub
      }

      return this
    }

    this.user = new User({
      email: this.socialData.email,
      name: this.socialData.name,
      password: this.socialData.sub,
      facebook_id: this.socialData.sub,
      photo: {
        url: this.socialData.picture
      },
      is_verified: true,
    })
    return this
  }
}
