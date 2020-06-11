/**
 We have required all the packages we need for our application, defined the database, created an express server and an express router.
Now, let's define CORS middleware, to ensure we do not run into any cross origin resource errors:
 */
// "use strict";

// Express and Request config
const express       = require('express')
const bodyParser    = require('body-parser')
const helmet        = require('helmet')
const compression   = require('compression')
const cors          = require('cors')

// init db and connect
const db            = require('./data/db')

// Express config
const app           = express();

// Express routing config
const router        = express.Router()
const routes        = require('./routes')
const errorMiddleware = require('./middleware/error')

require('dotenv').config()

// Security middlewares
const whitelist     = process.env.CORS_WHITELIST
const corsOptions   = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: function (origin, callback) {      
        if (whitelist.indexOf(origin) !== -1) { callback(null, true) } 
        else { callback(new Error('Not allowed by CORS')) }
    }
}
app.use(cors(corsOptions));
app.use(helmet())
app.use(compression())

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/**
For login, we use bcrypt to compare our hashed password with the user supplied password. If they are the same, we log the user in. If not, well, feel free to respond to the user how you please.
Now, let's use the express server to make our application accessible:
 */

app.use(router)
app.use(routes)
app.use(errorMiddleware)

process.title = 'iauu.api';
let port = process.env.PORT || 4444;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});