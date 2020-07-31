'use strict'

const BaseController = require('./base')
const UserService = require('../services/admin/user')
const UsersStatsService = require('../services/admin/usersStats')
const PresentationsStatsService = require('../services/admin/presentationsStats')
const SearchUsersService = require('../services/admin/searchUsers')
const UserStatsService = require('../services/admin/userStats')
const BlockUserService = require('../services/admin/blockUser')
const ActivateUserService = require('../services/admin/activateUser')
const VerifyUserService = require('../services/auth/verifyUser')
const LoginAsUserService = require('../services/auth/loginAsUser')

const SearchPresentationsService = require('../services/admin/searchPresentations')

class AdminController extends BaseController {
  getUsersStats(req, res, next) {    
    console.log("Requesting users stats...")

    const statsService = new UsersStatsService()
    statsService.retrieve()
      .then(() => { res.status(200).json(statsService.getStats()) })
      .catch((error) => next(error))
  }

  getPresentationsStats(req, res, next) {    
    console.log("Requesting presentations stats...")

    const statsService = new PresentationsStatsService()
    statsService.retrieve()
      .then(() => { res.status(200).json(statsService.getStats()) })
      .catch((error) => next(error))
  }

  getUsers(req, res, next) {    
    console.log("Requesting app users...")

    const searchUsersService = new SearchUsersService(req.data)
    searchUsersService.search()
      .then(() => { res.status(200).json(searchUsersService.getUsers()) })
      .catch((error) => next(error))
  }

  getUserStats(req, res, next) {    
    console.log("Requesting user stats...")

    const userStatsService = new UserStatsService(req.data)
    userStatsService.retrieve()
      .then(() => { res.status(200).json(userStatsService.getUser()) })
      .catch((error) => next(error))
  }

  blockUser(req, res, next) {    
    console.log("Blocking user...")

    const blockUserService = new BlockUserService(req.data)
    blockUserService.block()
      .then(() => { res.status(200).json(blockUserService.getUser()) })
      .catch((error) => next(error))
  }

  activateUser(req, res, next) {    
    console.log("Activating user...")

    const activateUserService = new ActivateUserService(req.data)
    activateUserService.activate()
      .then(() => { res.status(200).json(activateUserService.getUser()) })
      .catch((error) => next(error))
  }

  async verifyUser(req, res, next) {
    console.log("Verifying user...")

    const userService = new UserService(req.data)
    await userService.search()
    const user = userService.getUser()

    console.log('Found user to verify...')

    const verifyUserService = new VerifyUserService(user.verification.token, true)
    verifyUserService.verify()
      .then(() => { res.status(200).json(verifyUserService.getUser()) })
      .catch((error) => next(error))
  }

  async resendVerification(req, res, next) {
    console.log("Verifying user...")

    const userService = new UserService(req.data)
    await userService.search()
    const user = userService.getUser()

    console.log('Found user to verify...')

    const verifyUserService = new VerifyUserService(user.verification.token, true)
    verifyUserService.resend()
      .then(() => { res.status(200).json(verifyUserService.getUser()) })
      .catch((error) => next(error))
  }

  loginAsUser(req, res, next) {
    console.log('Logging in as user...')
    const loginAsUserService = new LoginAsUserService(req.data)

    loginAsUserService.login()
      .then(() => res.status(200).json(loginAsUserService.getToken()))
      .catch((error) => next(error))
  }

  getPresentations(req, res, next) {  
    console.log("Requesting app presentations...")

    const searchPresentationsService = new SearchPresentationsService(req.data)
    searchPresentationsService.search()
      .then(() => { res.status(200).json(searchPresentationsService.getPresentations()) })
      .catch((error) => next(error))
  }
}

module.exports = new AdminController()
