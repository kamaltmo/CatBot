const Twitter = require('twitter');
const request = require('request');
const auth = require('./auths').twitter;

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