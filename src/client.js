const Twitter = require('twitter');
const request = require('request');
let auth;

try {
  auth = require('./auths').twitter;
} catch (error) {
  auth = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  };
}

const twitter = new Twitter(auth);

function urlToData(url, callback) {
  const options = {
    uri: url,
    encoding: 'binary'
  };

  return request(options, function(e, resp, body) {
    return callback(new Buffer(body.toString(), 'binary'));
  });
}

const client = {
  tweet: (text) => {
    twitter.post('statuses/update', {status: text});
  },
  tweetImage: (img, text) =>  {
    urlToData(img, data => {
      twitter.post('media/upload', {media: data}, function(error, media) {
        if (!error) {
          var status = {
            status: text,
            media_ids: media.media_id_string
          };
          twitter.post('statuses/update', status);
        }
      });
    });
  }
};

module.exports = client;