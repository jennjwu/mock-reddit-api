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

function createRedditUser(username, password, next) {
    var db = getDb();

    if (db == null) {
        console.log("mongo connection not ready yet, please try again in a moment");
        return null;
    }

    db.collection('RedditUser', function(err, col) {
        var accessKey = randomString(20);
        col.insert({ username: username, password: password, accessKey: accessKey }, function(err, doc) {
            if (err) {
                console.log(err);
                throw err;
            }

            console.log("user created successfully with access key", accessKey);
            next(accessKey);
        });
    });
}

function validateAccessKey(accessKey, next) {
    var db = getDb();

    if (db == null) {
        console.log("mongo connection not ready yet, please try again in a moment");
        return null;
    }

    db.collection('RedditUser', function(err, col) {
        col.findOne({ accessKey : accessKey }, function(err, doc) {
            if (doc == null) {
                console.log("no user with such access key, unauthorized");
                next(false);
            } else {
                next(true);
            }
        });
    });
}

function resetAccessKeyForUser(username, password, next) {
    var db = getDb();

    if (db == null) {
        console.log("mongo connection not ready yet, please try again in a moment");
        return null;
    }

    db.collection('RedditUser', function(err, col) {
        col.findOne({ username: username, password: password }, function(err, doc) {
            if (doc == null) {
                console.log("no such user found");
                next(null);
            } else {
                var accessKey = randomString(20);
                col.update({ username: username, password: password}, {$set: {accessKey: accessKey}}, function(err, doc) {
                    console.log("new access key for user", accessKey);
                    next(accessKey);
                });
            }
        });
    });
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

module.exports = {
    create: createRedditUser,
    login: resetAccessKeyForUser,
    auth: validateAccessKey
}