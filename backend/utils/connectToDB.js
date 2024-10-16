const mongoose = require('mongoose');

async function connectToDB(connnectionString) {
    try {
        const response = await mongoose.connect(connnectionString);
        console.log(`Connected to MongoDB: ${response.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = connectToDB;