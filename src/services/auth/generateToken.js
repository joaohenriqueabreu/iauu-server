const jwt = require('jwt-simple')
const faker = require('faker')
const Artist = require('../../models/artist')
const Contractor = require('../../models/artist')

// in seconds - 30 days
const tokenExpiration = 60 * 60 * 24 * 30

module.exports = class GenerateTokenService {
    static generateSimple(size = 128) {
        return faker.random.alphaNumeric(size)
    }

    static async generateForUser(user) {  
        const payload = await this.getUserPayload(user)
        return jwt.encode(payload, process.env.AUTH_SECRET)
    }

    static async getUserPayload(user) {
        let photo = ''
        if (user.role !== undefined) {            
            const roleModel = user.role === 'artist' ? Artist : Contractor
            const roleInstance = await roleModel.fetchOne({ user: user.id })
    
            if (roleInstance !== null) {
                photo = roleInstance.media.photo
            }
        }

        const now = Math.floor(Date.now() / 1000)                
        const payload = {
            id:     user.id,
            role:   [user.role], // Role must be an array for frontend $auth handle access scope
            email:  user.email,
            name:   user.name,            
            photo:  {
                url: photo
            },
            iat:    now,            
            exp:    now + tokenExpiration 
        }
        
        return payload
    }    
}