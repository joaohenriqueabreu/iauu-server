const { User } = require('../models')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  User.collection.dropIndexes(() => {
    User.collection.reIndex(() => {
      console.log("finished re-indexing")
    })
  })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
