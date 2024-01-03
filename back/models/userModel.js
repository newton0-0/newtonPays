const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 100
    },   
    offers: [{
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'offers'
        },
        validUpto: {
            type: Date
        }
    }]
    // authenticated: {
    //     type: Boolean,
    //     default: false
    // }
}, {timestamps: true})

const User = mongoose.model('users', userSchema)
module.exports = User

// {
//     "username": "useer1", 
//     "email": "user1@gsmail.com", 
//     "password": "user1@gsmail.com", 
//     "phone": 9486781245,
//     "pin": "123456", 
//     "balance": 100
// }