const Client = require('instagram-private-api').V1;
const _ = require('lodash');
const device = new Client.Device('archakov06');
const storage = new Client.CookieFileStorage(__dirname + '/cookies/archakov06.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/instagram');

const { MediaModel } = require('./models/index');
const { config } = require('./config');

// And go for login
Client.Session.create(device, storage, config.USER, config.PASSWORD).then(async function(session) {
  const feed = new Client.Feed.UserMedia(session, 'PARSED_USER_ID', 10);
  const items = await feed
    .get()
    .map(item => _.pick(item.params, ['id', 'caption', 'images', 'user']));
  MediaModel.insertMany(items)
    .then(docs => {
      console.log('saved', docs.length);
    })
    .catch(err => {
      throw err;
    });
});
