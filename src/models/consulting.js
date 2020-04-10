const faker         = require('faker');
const Professional  = require('./Professional');
const Room          = require('./Room');
const Comment       = require('./Comment');

class Consulting {
    constructor(loadComments) {
        this.id             = faker.random.number(10000)
        this.created_at     = faker.date.recent()
        this.num_comments   = faker.random.number(50)
        this.room           = new Room(true)
        this.professional   = new Professional()
        this.last_comment_content = faker.lorem.paragraph()
        this.comments       = []
        
        if (loadComments) {
            for (let i = 0; i < this.num_comments; i++) {
                this.comments.push(new Comment())
            }
        }        
    }
}

module.exports = Consulting