'use strict'

const BaseController = require('./base')
const StatsService = require('../services/admin/stats')
const SearchUsersService = require('../services/admin/searchUsers')
const UserStatsService = require('../services/admin/userStats')
const BlockUserService = require('../services/admin/blockUser')
const ActivateUserService = require('../services/admin/activateUser')

class AdminController extends BaseController {
  getStats(req, res, next) {    
    console.log("Requesting app stats...")

    const statsService = new StatsService()
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
}

module.exports = new AdminController()
