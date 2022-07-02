const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')



// app use
app.use(cors());
app.use('/', express.static(__dirname + '/public'))


//set 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// set routes
require('./App/routes/website_url')(app)
require('./App/routes/admin_url')(app)
require('./App/routes/users_url')(app)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('somthing went wrong'))
    })

})

