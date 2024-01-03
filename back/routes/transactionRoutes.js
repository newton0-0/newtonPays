const express = require('express');
const router = express.Router();

const { 
    transaction, 
    getTransactions 
} = require('../controller/transactionController');

router.post('/send-money', transaction);
router.get('/get-transactions', getTransactions);

module.exports = router