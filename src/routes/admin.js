require('dotenv').config()
const api = require('express').Router()

const adminController = require('../controller/admin')
const authorizationMiddleware = require('../middleware/authorization')
const validationMiddleware = require('../middleware/validation')

api.get('/stats', authorizationMiddleware.authorize, authorizationMiddleware.admin, adminController.getStats)
api.get('/users', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.query, adminController.getUsers)
api.get('/users/:id/stats', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.getUserStats)
api.put('/users/:id', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.activateUser)
api.delete('/users/:id', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.blockUser)
// api.put('/presentations', authorizationMiddleware.authorize, authorizationMiddleware.admin, adminController.getPresentations)

module.exports = api