const BaseService   = require('../base');
const faker         = require('faker');
const jwt           = require('jwt-simple')

module.exports = {
    generate({email}) {
        console.log(email)
        const now = Math.floor(Date.now() / 1000)
        if (!['contractor', 'artist'].includes(email)) {
            throw new Error('Invalid user type')
        }
        
        const payload = {
            type: email,            
            iat: now,
            exp: now + (60 * 60 * 24)
        }

        return jwt.encode(payload, process.env.AUTH_SECRET)
    }
}