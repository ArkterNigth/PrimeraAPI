'use strict'

require('dotenv').config();

const mongo = {}

mongo.init = async () => {
    const mongoose = require('mongoose')

    let params = {
    }

    if (process.env.DB_USER && process.env.DB_PASSWORD) {
        params.auth = { authSource: "admin" }
        params.user = process.env.DB_USER
        params.pass = process.env.DB_PASSWORD
    }

    try {
        await mongoose.connect(
            `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME}`, 
            params
        )
        console.log('MongoDB Connection has been established successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = mongo;
