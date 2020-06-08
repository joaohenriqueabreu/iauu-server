const api   = require('express').Router()

api.get('/', (req, res) => res.status(200).json({ message: "Service up and running" }))

module.exports = api