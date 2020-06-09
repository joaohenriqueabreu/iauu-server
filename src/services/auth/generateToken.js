const BaseService   = require('../base');
const faker         = require('faker');
const jwt           = require('jwt-simple')

module.exports = {
    generate({id, name, email, type}) {        
        const now = Math.floor(Date.now() / 1000)                
        const payload = {
            type: type,
            email: email,
            name: name,
            id: id,            
            iat: now,
            exp: now + (60 * 60 * 24)
        }

        return jwt.encode(payload, process.env.AUTH_SECRET)
    }
}