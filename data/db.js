require('dotenv').config();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const EmailSubscriberSchema = require('../schemas/emailSubscriber');
const AdminUserSchema = require('../schemas/adminUser');

const connection = mongoose.createConnection(process.env.DB_CONN, {
  useNewUrlParser: true,
});

module.exports = {
  EmailSubscriber: connection.model('EmailSubscribers', EmailSubscriberSchema),
  AdminUser: connection.model('AdminUsers', AdminUserSchema),
};
