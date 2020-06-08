const api   = require('express').Router()
const moment    = require('moment')

const { Schedule, Timeslot } = require('../seeds')
let sessionUserType = 'guest'
api.get('/schedules/:id/:year', (req, res) => {
  console.log('Requsting schedule...')                        
  const schedule = new Schedule(sessionUserType === 'contractor')
  schedule.timeslots.sort((timeslot1, timeslot2) => {        
      return moment(timeslot1.start_dt).unix() - moment(timeslot2.start_dt).unix()
  })

  console.log(`Returning ${schedule.timeslots.length} events`)

  res.status(200).json(schedule)
})

module.exports = api