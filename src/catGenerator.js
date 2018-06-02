const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
global.fetch = fetch;

let auth;

try {
  auth = require('./auths').unsplash;
} catch (error) {
  auth = {
    applicationId: process.env.UNSPLASH_ID,
    secret: process.env.UNSPLASH_SECRET
  };
}

const collections = [1494900, 139386, 258603, 1494397, 1043053, 400003];
const unsplash = new Unsplash(auth);

async function getACat() {
  const photo = await toJson(
    await unsplash.photos.getRandomPhoto({ collections })
  );
  
  const {
    user: {
      name = '',
      links: {
        html = ''
      }
    } = {},
    urls: {
      regular
    }
  } = await photo;

  return {
    img: regular,
    source: (name || html) ? `#cat credit: ${name} ${html}` : '#cat'
  };
}

module.exports = getACat;