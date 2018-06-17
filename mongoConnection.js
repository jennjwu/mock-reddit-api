"use strict";

var config = require('./config');
var MongoClient = require('mongodb').MongoClient;

var mongoUser = process.env.mongoUser;
var mongoPass = process.env.mongoPass;
const MONGO_URL = `mongodb://${mongoUser}:${mongoPass}@${config.mongodb.host}/${config.mongodb.dbName}`;

var database; // holds mongodb connection

MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) {
        console.log(err);
        throw err;
    }

    console.log("connected to db at", MONGO_URL);
    database = db;
});

function getDb() {
    return database;
}
