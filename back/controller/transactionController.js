const mongoose = require('mongoose')

const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

const {passError, passData, verifyToken} = require('../utility/general')

const {doTransaction, chechReturnCashback} = require('../utility/transactions')
const {hashData} = require('../utility/general')

exports.transaction = async (req, res) => {
    const token = req.headers.authorization;
    const userCheck = verifyToken(token);
    const userId = await User.find({phone: userCheck});
    console.log(userId);
    if(!token || !userCheck) {
        res.status(404).json(passError('Token Authentication Failed', 404))
    }
    
    const transactionPart = {reciever, amount, description} = req.body;
    // const location = req.body.location;
    if(!transactionPart.reciever || !transactionPart.amount || !transactionPart.description) {
        res.status(404).json(passError('Please provide valid body', 404))
    }
    // const hashedLocation = await hashData([location.latitude, location.longitude]);
    // const sender_location = {
    //     latitude: hashedLocation[0],
    //     longitude: hashedLocation[1]
    // }
    
    const transaction = await doTransaction({ 
        senderphn: userCheck, 
        // sender_location,
        recieverphn: Number(transactionPart.reciever),
        amount: transactionPart.amount,
        description: transactionPart.description
    });

    const offer = await chechReturnCashback(transactionPart.amount, userId)
    console.log(offer);
    res.status(201).json(passData(offer, 201))
};

exports.getTransactions = async (req, res) => {
    const token = req.headers.authorization;
    const userCheck = verifyToken(token);
    if(!token || !userCheck) {
        res.status(404).json(passError('Token Authentication Failed', 404))
    };

    const findUser = await User.findOne({phone: userCheck});
    const transactions = await Transaction.find({ 
        $or : [
            {reciever: findUser._id}, 
            {sender: findUser._id}
        ]}).
        populate({path: 'sender reciever', select: 'username phone'}).
        select('sender reciever amount description createdAt');         
    console.log("transactions", transactions);
    const preData = transactions.map((transaction) => {
        const isReciever = transaction.sender.phone===userCheck? false : true;
        const friend = isReciever? transaction.sender : transaction.reciever;
        return {
            _id: transaction._id,
            friend: friend,
            amount: transaction.amount,
            description: transaction.description,
            createdAt: transaction.createdAt
        }
    });
    const finalData = preData.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime(); // Descending order
    });

    res.status(200).json(passData(finalData, 200))
};