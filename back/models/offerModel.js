const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        requiredd: true
    },
    company: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true
    },
    minAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cashback: {
        type: Number,
        default: null
    },
    msg: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Offer = mongoose.model('offers', offerSchema)
module.exports = Offer;