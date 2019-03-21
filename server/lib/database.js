"use strict";

const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
let db = null;

MongoClient.connect(MONGODB_URI, (err, connDb) => {
    if (err) {
        throw err;
    }
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