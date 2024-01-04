const express = require('express');
const mongoose = require('mongoose');

const Offer = require('../models/offerModel');

const {
    signup, 
    login, 
    forgotPasswordInitiation, 
    forgotPasswordVerification, 
    passwordReset,
    getUserData,
    getAllUser
} = require('../controller/userController')

const {authUser} = require('../utility/general')

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);

router.get('/profile', getUserData);
router.get('/search', authUser, getAllUser);

router.get('/forgot-password/initiate', forgotPasswordInitiation);
router.post('/forgot-password/verify', forgotPasswordVerification);
router.patch('/forgot-password/reset', authUser, passwordReset);

module.exports = router