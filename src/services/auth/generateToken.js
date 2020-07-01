const jwt = require('jwt-simple')
const faker = require('faker')
const { User, Artist, Contractor } = require('../../models')

// 30 days (in seconds)
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
        if (! user instanceof User) {
             throw new Error('Invalid user')
        }

        const now = Math.floor(Date.now() / 1000)                
        const payload = {
            id:     user.id,
            // Role must be an arrah for frontend $auth handle access scope
            role:   [user.role],
            email:  user.email,
            name:   user.name,            
            photo:  user.media.photo,
            role_id: user.getRoleId(),
            requires_initial_setup: this.needsSetup(user),
            iat:    now,            
            exp:    now + tokenExpiration 
        }
        
        return payload
    }

    static needsSetup(user) {
        if (user.role === 'artist' && user.artist instanceof Artist) {
            return user.artist.products === undefined || user.artist.products.length === 0
        }

        return false
    }
}