const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
var session = require('express-session');
var bodyParser = require('body-parser');
const moment = require('moment');
const MongoStore = require('connect-mongo');
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});
const ObjectId = require('mongoose').Types.ObjectId;
// require('dotenv').config();
//db connect
require('./App/db');

    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            ttl: 24 * 60 * 60 * 7 // 1 week
        })



    }));

    app.use((req, res, next) => {
        req.url_params = req.url.split('/')[1];
        app.locals.url_params = req.url_params;
        if (app.locals.url_params != '') {
          app.locals.role = app.locals.url_params;
        } 
        if(req.session.role !=undefined && req.session.role !=''){
            app.locals.is_login = req.session.role;
        }else{
            app.locals.is_login = undefined;
        }
        

        next();
      }
      );

// app use
// app.use(cors());
app.use('/', express.static(__dirname + '/public'))


//set 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// set routes
require('./App/routes/website_url')(app)
require('./App/routes/admin_url')(app)
require('./App/routes/users_url')(app)
require('./App/routes/auth_url')(app)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})

// Express error handling
// app.use((req, res, next) => {
//     setImmediate(() => {
//         next(new Error('somthing went wrong'))
//     })

// })

