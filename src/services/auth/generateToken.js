const jwt = require('jwt-simple')
const faker = require('faker')

// in seconds - 30 days
const tokenExpiration = 60 * 60 * 24 * 30

module.exports = class GenerateTokenService {
    static generateSimple(size = 128) {
        return faker.random.alphaNumeric(size)
    }

    static generateForUser(user) {        
        const now = Math.floor(Date.now() / 1000)                
        const payload = {
            role: user.role,
            email: user.email,
            name: user.name,
            id: user.id,            
            iat: now,            
            exp: now + tokenExpiration 
        }

        return jwt.encode(payload, process.env.AUTH_SECRET)
    }    
}