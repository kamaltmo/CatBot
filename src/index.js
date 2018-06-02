const client = require('./client');
const catGenerator = require('./catGenerator.js');

async function tweetACat() {
  const {
    img,
    source
  } = await catGenerator();
  client.tweetImage(img, source);
}

tweetACat();