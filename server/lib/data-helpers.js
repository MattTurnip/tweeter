"use strict";

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function (newTweet, callback) {
      db.saveTweet(newTweet, callback);
    },

    getTweets: function (callback) {
      db.getTweets(callback);
    }

  };
}
