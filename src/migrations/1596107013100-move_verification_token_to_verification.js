const _ = require('lodash')
const { User } = require('../models')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  const users = await User.find().select('+verification_token')
  _.forEach(users, (user) => {
    console.log(`Migrating user ${user.id}...`)
    if (user.verification !== undefined && user.verification.token !== undefined) {
      console.log('Token exists...')
      return
    }

    console.log(user.verification_token)
    console.log(user.verification_token !== undefined)
    if (user.verification_token !== undefined) {
      console.log('Saving user...')
      user.verification.token = user.verification_token
      user.save()
    }
  })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
