const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const auth = require('./auths').unsplash;
global.fetch = fetch;

const COLLECTIONS = [1494900, 139386, 258603, 1494397, 1043053, 400003];
const unsplash = new Unsplash(auth);

async function getACat() {
  const photo = await toJson(
    await unsplash.photos.getRandomPhoto({ COLLECTIONS })
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
    source: (name || html) ? `credit: ${name} ${html}` : ''
  };
}

module.exports = getACat;