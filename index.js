const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
var session = require('express-session');
var bodyParser = require('body-parser');

// require('dotenv').config();
//db connect
require('./App/db');


    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
        
    }));
  

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

