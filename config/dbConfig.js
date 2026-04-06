const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTION_STRING
const dbname = process.env.DB_NAME

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            dbName: dbname
        });
        console.log(`Database connected to ${mongoose.connection.name}`);
        
        mongoose.connection.on('disconnected', () => {
            console.log("Mongoose disconnected");
        });

        mongoose.connection.on('error', () => {
            console.log("Database connection failed!!");
        });
    } catch (error) {
        console.log(error);
        console.log("Database connection failed!!");
    }
}
connectDB();

