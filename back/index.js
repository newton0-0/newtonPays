require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const uri = process.env.dbURI;
const PORT = process.env.PORT;

const mongoose = require('mongoose')

const app = express();

app.use(express.json());
app.use('/payment', transactionRoutes);
app.use('/user', userRoutes);

mongoose.connect(uri)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database Connected and liostening on port : ', PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })