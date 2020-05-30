/**
 We have required all the packages we need for our application, defined the database, created an express server and an express router.
Now, let's define CORS middleware, to ensure we do not run into any cross origin resource errors:
 */
// "use strict";

const express       = require('express');
const bodyParser    = require('body-parser');

const app           = express();
const router        = express.Router();
const routes        = require('./routes')

require('dotenv').config()

const simpleReply   = function (req, res) { 
    if (req.body) { console.log(req.body); }
    res.status(200).send({message: "wooow"});
};

const delayedReply = function (req, res, payload) {
    if (req.body) { console.log(req.body); }
    setTimeout(() => res.status(200).send(payload), 2000);   
};

const randomModels = function (ceil = 10) {
    return Math.ceil(Math.random() * ceil); 
};

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 Many people would use a CORS package here, but we do not have any complicated configurations, so this is fine.
Let's define the route for registering a new user: 
 */
// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain);

/**
For login, we use bcrypt to compare our hashed password with the user supplied password. If they are the same, we log the user in. If not, well, feel free to respond to the user how you please.
Now, let's use the express server to make our application accessible:
 */
app.use(router)

process.title = 'iauu.server';
let port = process.env.PORT || 3003;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});

app.use(routes)