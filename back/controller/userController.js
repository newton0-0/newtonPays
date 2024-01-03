const mongoose = require('mongoose')

//model import
const userModel = require('../models/userModel')
const transactionModel = require('../models/transactionModel')

//utilty function import
const {passError, passData, hashData, compareData, randomString, createToken, createVerificationArray, verifyToken} = require('../utility/general')

exports.signup = async (req, res) => {
    const {username, phone, email, password, pin, balance} = req.body
    
    if (!username || !email || !password || !pin || !balance || !phone) {
        return res.status().json(passError('Please fill all the fields', 404))
    }
    
    const hashedData = await hashData([password, pin])
    const userId = await randomString(6);

    const newUserData = await userModel.create({
        userId,
        username,
        phone,
        email,
        password: hashedData[0],
        pin: hashedData[1],
        balance
    })

    const authToken = createToken(newUserData.phone)

    res.header('Authorization', authToken).json(passData(201))
    // const newUser = await userModel.create(userData);
}

exports.login = async (req, res) => {
    const {phone, password} = req.body
    if(!phone || !password) {
        return res.status(404).json(passError('Please fill all the fields', 404))
    }

    const user = await userModel.findOne({phone})
    if(!user) {
        return res.status(404).json(passError('User not found', 404))
    }

    const isMatch = await compareData(password, user.password)
    if(!isMatch) {
        return res.status(400).json(passError('Password not matched', 404))
    }
    const userPhone = user.phone
    console.log("isMatchPhone", userPhone);
    const authToken = createToken(userPhone);

    res.status(200).header({'authorization' : authToken}).json({...passData(200)})
}

exports.forgotPasswordInitiation = async (req, res) => {
    const {phone} = req.body
    if(!phone) {
        return res.status(404).json(passError('Please fill all the fields', 404))
    }

    const user = await userModel.findOne({phone}).select('userId')
    if(!user) {
        return res.status(404).json(passError('User not found', 404))
    }

    const verificationCodes = createVerificationArray(user)
    res.status(200).json(passData(verificationCodes, 200))
}

exports.forgotPasswordVerification = async (req, res) => {
    const userIdRec = req.body
    if(!userIdRec) {
        return res.status(404).json(passError('Please provide the user id', 404))
    }

    const user = await userModel.findOne({userId: userIdRec})
    if(!user) {
        res.status(404).json(passError('User not found', 404))
    }

    const authToken = createToken(user.phone)
    res.header('Authorization', authToken).json(passData(200))
}

exports.passwordReset = async (req, res) => {
    const passwordResetToken = req.headers.authorization
    if(!passwordResetToken) {
        res.status(404).json(passError('Please provide the password reset token', 404))
    }

    const {phone, password} = req.body
    if(!phone || !password) {
        res.status(404).json(passError('Please fill all the fields', 404))
    }

    const user = await userModel.findOne({phone})
    if(!user) {
        res.status(404).json(passError('User not found, apologies!', 404))
    }

    const hashedData = await hashData([password])

    const userPasswordUpdate = await userModel.updateOne({phone}, {password: hashedData[0]})
    if(!userPasswordUpdate) {
        res.status(404).json(passError('Something went wrong', 404))
    }

    const authToken = createToken(userPasswordUpdate.phone)
    res.header('Authorization', authToken).json(passData(200))
}

exports.getUserData = async (req, res) => {
    const token = req.headers.authorization;
    const userCheck = verifyToken(token);
    // console.log("userCheck", userCheck);
    const userData = await userModel.findOne({phone: userCheck}).
    populate({
        path: 'offers', 
        populate: {
            path: 'offerId'
        }});
    const userTransactions = await transactionModel.find({sender: userData._id} || {reciever: user._id})
    
    console.log("user90", userCheck);
    if(!userData) {
        res.status(404).json(passError('User not found', 404))
    }
    //const userTransactions = await transactionModel.find({sender: user._id} || {reciever: user._id})
    console.log("userData", userData, "userTransactions", userTransactions);
    res.status(200).json(passData({userData, userTransactions}, 200))
}

exports.getAllUser = async (req, res) => {
    const users = await userModel.find().select('username phone email')
    res.status(200).json(passData(users, 200))
}