const faker = require('faker');

module.exports = class Professional {
    constructor(loadDetails) {
        this.id             = faker.random.number(10000);
        this.name           = faker.name.findName();
        this.company_name   = faker.company.companyName();
        this.is_verified    = faker.random.boolean();
        this.address        = `${faker.address.streetName()} ${Math.ceil(Math.random() * 100)}`
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
        this.zipcode        = faker.address.zipCode();
        this.photo          = faker.image.avatar();
        this.rating         = {
            rate: faker.random.number(5),
            amount: faker.random.number(100)
        }

        if (loadDetails) {
            this.email               = faker.internet.email();
            this.phone               = faker.phone.phoneNumber();
            this.pinterest_token     = faker.random.alphaNumeric(32);
            this.pinterest_board_url = 'https://br.pinterest.com/joaohenriqueabreu/endgame/';
            this.num_consultings        = faker.random.number(100);
            this.num_consultings_for_me = faker.random.number(20);
            this.active_since           = faker.random.number(50);
            this.has_interacted_with_me = faker.random.boolean();
        }
    }
}