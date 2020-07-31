require('dotenv').config()
const api = require('express').Router()

const adminController = require('../controller/admin')
const authorizationMiddleware = require('../middleware/authorization')
const validationMiddleware = require('../middleware/validation')

api.get('/users/stats', authorizationMiddleware.authorize, authorizationMiddleware.admin, adminController.getUsersStats)
api.get('/presentations/stats', authorizationMiddleware.authorize, authorizationMiddleware.admin, adminController.getPresentationsStats)
api.get('/users', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.query, adminController.getUsers)
api.get('/users/:id/stats', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.getUserStats)
api.put('/users/:id', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.activateUser)
api.put('/users/:id/verify', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.verifyUser)
api.post('/users/:id/verify/resend', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.resendVerification)
api.delete('/users/:id', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.id, adminController.blockUser)

api.get('/presentations', authorizationMiddleware.authorize, authorizationMiddleware.admin, validationMiddleware.query, adminController.getPresentations)

module.exports = api