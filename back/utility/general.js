const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

function passError(msg, code) {
  if (!code) {
    return "Kindly mention error code first";
  }

  const errorMessages = {
    500: "Internal Server Error",
    400: "Bad request",
    401: "Unauthorized Access Demanded",
    404: "Not Found"
  };

  const errorMessage = errorMessages[code];

  if (!errorMessage) {
    return "Invalid error code";
  }

  return {
    success: false,
    message: msg,
    error: errorMessage,
    status: code
  };
}

function passData(data, statusCode) {
  if (!data) {
    return {
      success: true,
      status: statusCode
    }
  }
    return {
        success: true,
        status: statusCode,
        data: data
    }
}

async function hashData(unhashed) {
    if (!unhashed) {
        return passError('Please fill all the fields', 404)
    }
    const hashed = await Promise.all(
      unhashed.map(async (item) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(item, salt);
      })
    );
    
    if(!hashed) {
        return passError('Mapping error', 404)
    }
    return hashed;
}

async function compareData(unhashed, hashed) {
    return await bcrypt.compare(unhashed, hashed);
}

async function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    const userIdExists = await userModel.findOne({userId: result});
    if(userIdExists) {
        return randomString(length);
    }

    return result;
}

function createToken(phone) {
    return jwt.sign({user: phone}, process.env.JWT_SECRET, { expiresIn: '2h' });
}

function verifyToken(token) {
  console.log("token", token);
    const isUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return passError('Invalid token', 404);
        }
        const decoded = jwt.decode(token);
        console.log("decoded", decoded);
        return decoded;
    });
    console.log("user123", isUser.user);
    return isUser.user;
}

function authUser(req, res, next) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(404).json(passError('Please provide the token', 404))
    }
    const isToken = verifyToken(token);
    if(!isToken) {
        return res.status(404).json(passError('Invalid token', 404))
    }
    next();
}

function createVerificationArray(userId) {
  // Create an array of 5 elements with random strings
  const randomStringsArray = Array.from({ length: 5 }, () => randomString(6));

  // Replace one random element with a constant userId
  const randomIndex = Math.floor(Math.random() * 5);
  randomStringsArray[randomIndex] = userId;

  return randomStringsArray;
}

module.exports = {
  passError, 
  passData, 
  hashData, 
  compareData, 
  randomString, 
  createToken, 
  createVerificationArray, 
  verifyToken,
  authUser
}