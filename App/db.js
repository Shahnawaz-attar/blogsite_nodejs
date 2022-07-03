const mongoose = require('mongoose')
require('dotenv').config();
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))
    
