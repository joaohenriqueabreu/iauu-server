const faker         = require('faker');
const Professional  = require('./Professional');
const Room          = require('./Room');
const Comment       = require('./Comment');

class Consulting {
    constructor() {
        this.id                     = faker.random.number(10000);
        this.created_at             = faker.date.recent();
        this.last_commented_at      = faker.date.recent();
        this.num_comments           = faker.random.number(50);                
        this.last_comment_content   = faker.lorem.paragraph();
        this.comments               = [];                
    }
}

module.exports = Consulting