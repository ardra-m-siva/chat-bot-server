require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/userRouter');
const chatSocket = require('./sockets/chatSocket');

// set port number
let PORT = process.env.PORT || 3000;

// to connect to mongoDb database
require('./config/dbConfig');

// create express server
const app = express()
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*'
    }
});

// create socket io server
chatSocket(io)

app.use(express.json())
app.use(cors({
    origin:'*'
}))

// morgan is basically used to console all request reaching in the server- dev, common, combined, etc. are the methods are used 
app.use(morgan('dev'))
// to setup socket 
app.set("io", io);
app.set("trust proxy", 1);

app.use('/api/user', userRouter)


httpServer.listen(PORT, () => {
    console.log("Server Started Successfully", PORT);
})

app.get('/', (req, res) => {
    res.send('Server started')
})


