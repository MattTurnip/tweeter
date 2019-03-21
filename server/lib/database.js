"use strict";

const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

let db = null;

MongoClient.connect(MONGODB_URI, (err, connDb) => {
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }
    console.log(`Connected to mongodb: ${MONGODB_URI}`);
    db = connDb;


});

module.exports = {
    getTweets: function (callback) {
        db.collection("tweets").find().toArray(callback);
    },
    saveTweet: function (newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, callback);
    }

}