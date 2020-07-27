require('dotenv').config()

const RegisterAdminUserService = require('../services/auth/registerAdminUser')
/**
 * Make any changes you need to make to the database here
 */
async function up () {
  const registerAdminUserSvc = new RegisterAdminUserService('admin', process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
  await registerAdminUserSvc.register()
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
