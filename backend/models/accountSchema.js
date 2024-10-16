const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;