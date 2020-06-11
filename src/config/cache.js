const Memcached = require('memcached');
const require('dotenv').config()

const options = {
  
}

module.exports = new Memcached(process.env.MEMCACHED_SERVER, options);
