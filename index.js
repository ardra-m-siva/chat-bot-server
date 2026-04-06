const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()

const userRouter = require('./routes/userRouter');

// set port number
let PORT = process.env.PORT || 3000;

// to connect to mongoDb database
require('./config/dbConfig');

// create express server
const app = express()
app.use(express.json())
app.use(cors('*'))

// morgan is basically used to console all request reaching in the server- dev, common, combined, etc. are the methods are used 
app.use(morgan('dev'))
app.set("trust proxy", 1);

app.use('/server/user', userRouter)


app.listen(PORT, () => {
    console.log("Server Started Successfully", PORT);
})

app.get('/', (req, res) => {
    res.send('Server started')
})


