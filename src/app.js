/**
 We have required all the packages we need for our application, defined the database, created an express server and an express router.
Now, let's define CORS middleware, to ensure we do not run into any cross origin resource errors:
 */
// "use strict";

const express       = require('express');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const bodyParser    = require('body-parser');

const DB            = require('./db');
const config        = require('./config');

const User          = require('./models/user');
const Professional  = require('./models/professional');
const Customer      = require('./models/customer');
const Room          = require('./models/room');
const Consulting    = require('./models/consulting');
const Comment       = require('./models/comment');

const db            = new DB("sqlitedb")
const app           = express();
const router        = express.Router();

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

process.title = 'reforma.ai.server';
let port = process.env.PORT || 3002;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});

app.get('/', function(req, res) {
    res.status(200).send({ message: "Service up and running" });
});

app.get('server', function(req, res) {
    res.status(200).send({ message: "Route working fine" });
});

app.get('/api/rooms', function(req, res) {      
    let rooms = [];
    for(let i = 0; i < randomModels(); i++) {
        rooms.push(new Room());
    }

    res.status(200).send(rooms);    
});

app.get('/api/rooms/:id', function(req, res) {    
    let room = new Room(); 
    room.customer = new Customer();
    for(let i=0; i < randomModels(); i++) {
        const consulting        = new Consulting();
        consulting.professional = new Professional();
        consulting.room         = {id: room.id};        
        room.consultings.push(consulting);
    }

    res.status(200).send(room);
});

app.post('/api/rooms', function(req, res) {
    console.log(req.body);
    if (req.body.room !== undefined) {
        setTimeout(() => res.status(200).send({message: 'yey'}), 3000); 
    }
});

app.put('/api/rooms', function(req, res) {
    console.log(req.body);
    if (req.body.room !== undefined) {
        setTimeout(() => res.status(200).send({message: 'yey'}), 3000); 
    }
});

app.get('/api/consultings', function(req, res) {      
    let consultings = [];
    for(let i = 0; i < randomModels(); i++) {
        const consulting        = new Consulting();
        consulting.room         = new Room();
        consulting.professional = new Professional();
        consultings.push(consulting);
    }

    res.status(200).send(consultings);    
});

app.get('/api/consultings/:id', function(req, res) {
    const consulting        = new Consulting();
    consulting.room         = new Room();
    consulting.professional = new Professional();
    for (let i = 0; i < randomModels(); i++) {
        consulting.comments.push(new Comment());
    }

    res.status(200).send(consulting);
});

app.get('/api/rooms/:id/consultings', function (req, res) {
    const room = new Room();    
    for (let i = 0; i < room.num_consultings; i++) {
        const consulting    = new Consulting();   
        consulting.room     = {id: room.id};        
        room.consultings.push(consulting);
    }

    res.status(200).send(room);
});

app.get('/api/customers/:id', function(req, res) {
    setTimeout(() => res.status(200).send(new Customer(true)), 2000);    
});

app.post('/api/customers/professionals/:id/authorize', simpleReply);
app.post('/api/customers/consultings/:id/close', simpleReply);
app.post('/api/customers/professionals/:id/block', simpleReply);

app.get('/api/professional/:id/customers', function(req, res) {
    if (req.params.id === '123') {
        res.status(200).send(new Customer(true));
        return;
    }    

    res.status(500).send({error: "nope"});
});

app.get('/api/professionals', function(req, res) {
    const numPros = Math.ceil(Math.random() * 10);    
    let pros = [];
    for(let i = 0; i < numPros; i++) {
        pros.push(new Professional());
    }

    res.status(200).send(pros);
});

app.get('/api/professionals/:id', function(req, res) {
    if (req.params.id !== undefined) {
        res.status(200).send(new Professional(true));
        return;
    }

    res.status(500).send({error: 'nope'});
});

app.post('/api/comments', function(req, res) {
    res.status(200).send(new Comment());
});

app.post('/register', function(req, res) {
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
    ],
    function (err) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        }); 
    }); 
});

app.post('/register-admin', function(req, res) {
    db.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
    function (err) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        db.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        }); 
    }); 
});

app.post('/api/login', (req, res) => {
    let user = new User(req.body.type);
    console.log(req.body);
    user.type = req.body.type;    
    
    return setTimeout(() => res.status(200).send(user), 3000); 
    // db.selectByEmail(req.body.email, (err, user) => {
    //     if (err) return res.status(500).send('Error on the server.');
    //     if (!user) return res.status(404).send('No user found.');
    //     let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    //     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    //     let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
    //     });
    //     res.status(200).send({ auth: true, token: token, user: user });
    // });
});

const GenerateTokenService = require('.//services/auth/GenerateTokenService')
app.post('/api/validate', (req, res) => {  
    console.log(req.body)      ;
    let user    = new User(req.body.type); 

    // Create a new token
    user.token = GenerateTokenService.generate();
    res.status(200).send(user);
});