const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User