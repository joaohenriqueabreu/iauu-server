const jwt = require('express-jwt');
const RetrieveUserService = require('../services/user/retrieveUser')

module.exports = {
  authorize: (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }    
    return [      
        // authenticate JWT token and attach user to request object (req.user)
        // jwt({secret: process.env.AUTH_SECRET}),
        jwt({secret: 'abc'}),

        // authorize based on user role
        async (req, res, next) => {
            const user = await RetrieveUserService({id: req.user.id })

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user.role = account.role;
            next();
        }
    ];
  }
}