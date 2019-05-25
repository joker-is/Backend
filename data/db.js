const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const EmailSubscriberSchema = require('../schemas/emailSubscriber');

const connection = mongoose.createConnection(
  // TODO!: FIX USERNAME AND PASSWORD STRING
  'mongodb://<dbuser>:<dbpassword>@ds261096.mlab.com:61096/joker',
  // 'mongodb://adminUser:XwLFw9f7vZjm@ds261096.mlab.com:61096/joker',
  { useNewUrlParser: true }
);

module.exports = {
  EmailSubscriber: connection.model('EmailSubscribers', EmailSubscriberSchema),
};
