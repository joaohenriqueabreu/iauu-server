const _ = require('lodash')
const { User } = require('../models')
/**
 * Make any changes you need to make to the database here
 */
async function up () {
  const users = await User.find()
  _.forEach(users, (user) => {
    if ((user.verification !== undefined && 
      user.verification !== null && user.verification.is_verified) ||
      user.is_verified) {
      console.log(`Activating user ${user.name}`)
      user.status = 'active'
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
