/**
 We have required all the packages we need for our application, defined the database, created an express server and an express router.
Now, let's define CORS middleware, to ensure we do not run into any cross origin resource errors:
 */
// "use strict";

// Express and Request config
const express       = require('express')
const bodyParser    = require('body-parser')
// const cors          = require('cors')

// connect to db
const db            = require('./config/db')


// Express config
const app           = express();

// Express routing config
const router        = express.Router()
const routes        = require('./routes')
const errorMiddleware = require('./middleware/error')

require('dotenv').config()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// }

// app.use(allowCrossDomain);
// var whitelist = ['http://localhost:3333', 'http://localhost:80']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));

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