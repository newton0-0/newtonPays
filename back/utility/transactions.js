const express = require('express')

const transactionModel = require('../models/transactionModel')
const userModel = require('../models/userModel')
const Offer = require('../models/offerModel')
const { passError, passData } = require('./general')
const { login } = require('../controller/userController')

//utility functions
//function to perform ransaction using necessary params
async function doTransaction({senderphn, recieverphn, amount, description, sender_location}) {
    const sender = await userModel.findOne({phone: senderphn}).select('_id balance friends')
    const reciever = await userModel.findOne({phone: recieverphn}).select('_id balance friends')
    console.log("sender", senderphn, "reciever", reciever);
    
    const senderUpdate = await userModel.findByIdAndUpdate(sender._id, 
        { $inc: {balance: -amount}}, 
        {new : true});
    if(!senderUpdate) {
        return passError('Something went wrong, no amount deducted', 404)
    }
    const recieverUpdate = await userModel.findByIdAndUpdate(reciever._id,  {
         $inc: {balance: amount}}, 
         {new : true})
    if(!recieverUpdate) {
        const reUpdate = await userModel.findByIdAndUpdate(sender._id, { $inc: { balance: amount } }, {new : true})
        return passData(reUpdate, 404)
    }

    const transaction = await transactionModel.create({sender, reciever, amount, description, sender_location});
    if(!transaction) {
        return passError('Something went wrong, no transaction created', 404)
    }
    return passData(transaction, 201)
}

async function selectCoupon(amount) {
    const coupons = await Offer.find({ minAmount: { $lte: amount } });
    console.log("coupons", coupons);
    const randomIndex = Math.floor(Math.random() * coupons.length);
    const selectedCoupon = coupons[randomIndex];

    return selectedCoupon;
}

async function chechReturnCashback(amount, userId) {
    if(amount%500 === 0) {
        const today = new Date();
        const sevenDaysLater = new Date(today.getTime() + 7*24*60*60*1000); 
        const selectedCoupon = await selectCoupon(amount);
        console.log("selectedCoupon", selectedCoupon);
        const updateUser = await userModel.findByIdAndUpdate(userId, {
            $push : { offers : { offerId : selectedCoupon._id, validUpto : sevenDaysLater } }
        });
        return {
            "offerType" : "coupon",
            "offer" : selectCoupon,
            "success" : true
        };
    }
    if(amount >= 1000) {
        const returnAmount = (2*amount)/100;
        const returnCashbackedUser = await userModel.findByIdAndUpdate(userId, { $inc: { balance: returnAmount } }, {new : true});
        return { 
            "offerType" : "cashback",
            "offer" : returnAmount,
            "success" : true
        };
    }
    if(amount < 1000) {
        const returnAmount = (5*amount)/100;
        const returnCashbackedUser = await userModel.findByIdAndUpdate(userId, { $inc: { balance: returnAmount } }, {new : true});
        return { 
            "offerType" : "cashback",
            "offer" : returnAmount,
            "success" : true
        };
    }
    else{
        return { 
            "message" : "Sorry No Elgible Offers! \n Better Luck Neext Time.",
            "success" : false
        }
    }
}

module.exports = {
    doTransaction,
    chechReturnCashback
}