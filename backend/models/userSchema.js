const moongose = require('mongoose');

const userSchema = moongose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = moongose.model('User', userSchema);

module.exports = User;