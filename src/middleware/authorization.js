require('dotenv').config()
const jwt = require('express-jwt');
const RetrieveUserService = require('../services/user/retrieveUser')

module.exports = {
  authorize: (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }    
    console.log('authorizing...')
    
    return [      
        // authenticate JWT token and attach user to request object (req.user)
        jwt({secret: process.env.AUTH_SECRET}),        

        // authorize based on user role
        async (req, res, next) => {
          console.log('authorizing...ok')          

          // For now only parse jwt token
          next()
          // const retrieveUserSvc = new RetrieveUserService({_id: req.user.id })          
          // retrieveUserSvc.retrieve()
          //   .then((user) => {
          //     req.user = user
          //     next()
          //   })
          //   .catch((error) => next(error))
        }
    ];
  }
}