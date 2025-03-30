const mongoose = require('mongoose');
require('dotenv').config();


const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('inside connectToDB Error connecting to MongoDB:', error);
    });
};

module.exports = connectToDB;
