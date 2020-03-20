const faker = require('faker');

module.exports = class Comment {
    constructor() {
        this.id     = faker.random.number(10000);
        this.sender = {
            id: faker.random.number(10000),
            name: faker.name.findName(),
            photo: faker.image.avatar(),
            type: faker.random.boolean() ? 'customer' : 'professional'
        },
        this.viewer = {
            id: faker.random.number(10000),
            name: faker.name.findName(),
            photo: faker.image.avatar(),
            type: this.sender.type === 'customer' ? 'professional' : 'customer'
        };        

        this.content = faker.lorem.sentences();

        if (faker.random.boolean()) {
            const numMedias = faker.random.number(3);
            this.medias = [];
            for (let i = 0; i < numMedias; i++) {
                this.medias.push({
                    id: faker.random.number(500000),
                    type: 'image',
                    url: faker.image.avatar()
                });
            }
        }

    }
}