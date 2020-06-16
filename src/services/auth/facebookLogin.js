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
      $or: [{ facebook_id: this.socialData.id }, { email: this.socialData.email }],
    })
    await this.registerNewUser()
    this.generateAccessToken()
    await this.saveUser()

    return this
  }

  async fetchProfile() {
    console.log('Trying to get Facebook profile...')
    const { data } = await axios.get(
      `https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday&access_token=${this.token}`
    )

    if (data === undefined) {
      throw new Error('Unable to get user data from Facebook')
    }

    this.socialData = data
  }

  async registerNewUser() {
    if (!User.notFound(this.user)) {
      console.log('Found user')
      // found user
      // User might be login in with Facebook for the 1st or nth time
      console.log(this.user.facebook_id)
      if (this.user.facebook_id === undefined || this.user.facebook_id === null) {
        this.user.facebook_id = this.socialData.id
      }

      return this
    }

    this.user = new User({
      email: this.socialData.email,
      name: this.socialData.name,
      password: this.socialData.id, // writing a "faker" pwd that will not be encrypted, but is required for saving
      facebook_id: this.socialData.id,
      photo: this.socialData.picture,
      is_verified: true,
    })
    return this
  }

  async validateLogin() {
    if (User.notFound(this.user)) {
      throw new Error('Invalid credentials provided')
    }

    if (!(await this.validatePassword(this.password))) {
      throw new Error('Invalid credentials provided')
    }

    return this
  }
}
