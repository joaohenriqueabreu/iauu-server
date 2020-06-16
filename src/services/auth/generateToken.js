const jwt = require('jwt-simple')
const faker = require('faker')

// in seconds - 30 days
const tokenExpiration = 60 * 60 * 24 * 30

module.exports = class GenerateTokenService {
    static generateSimple(size = 128) {
        return faker.random.alphaNumeric(size)
    }

    static generateForUser(user) {        
        return jwt.encode(this.getUserPayload(user), process.env.AUTH_SECRET)
    }

    static getUserPayload(user) {     
        const now = Math.floor(Date.now() / 1000)                
        const payload = {
            id:     user.id,
            role:   [user.role], // Role must be an array for frontend $auth handle access scope
            email:  user.email,
            name:   user.name,            
            photo:  {
                url: faker.image.avatar()
            },
            iat:    now,            
            exp:    now + tokenExpiration 
        }
        
        return payload
    }    
}