'use strict'

const BaseController = require('./base')
const SearchScheduleService = require('../services/schedule/searchSchedule')
const SaveTimeslotService = require('../services/schedule/saveTimeslot')
const DeleteTimeslotService = require('../services/schedule/deleteTimeslot')

class ScheduleController extends BaseController {
  publicSearch(req, res, next) {    
    console.log("Requesting schedule...")

    const searchScheduleService = new SearchScheduleService(req.user, req.data)
    searchScheduleService.search(req.user, req.data)
      .then(() => { res.status(200).json(searchScheduleService.getSchedule()) })
      .catch((error) => next(error))
  }
  
  mySchedule(req, res, next) {
    
  }

  saveTimeslot(req, res, next) {    
    console.log("Saving timeslot...")

    const saveTimeslotService = new SaveTimeslotService(req.user, req.data)
    saveTimeslotService.save(req.user, req.data)
      .then(() => { res.status(200).json(saveTimeslotService.getTimeslot()) })
      .catch((error) => next(error))
  }

  deleteTimeslot(req, res, next) {    
    console.log("Deleting timeslot...")

    const deleteTimeslotService = new DeleteTimeslotService(req.user, req.data)
    deleteTimeslotService.delete(req.user, req.data)
      .then(() => { res.status(200).json({}) })
      .catch((error) => next(error))
  }
}

module.exports = new ScheduleController()
