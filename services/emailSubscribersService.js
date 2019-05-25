const { EmailSubscriber } = require('../data/db');

const emailSubscribersService = () => {
  const getAllAvailableEmails = (callback, onFailure) => {
    EmailSubscriber.find({}, (err, emailSubscribers) => {
      if (err) return onFailure(Error(500));
      if (emailSubscribers === undefined) return onFailure(Error(404));
      let availableEmails = emailSubscribers.filter(email => email.active);
      return callback(availableEmails);
    });
  };
  const getAllEmails = (callback, onFailure) => {
    EmailSubscriber.find({}, (err, emailSubscribers) => {
      if (err) return onFailure(Error(500));
      if (emailSubscribers === undefined) return onFailure(Error(404));
      return callback(emailSubscribers);
    });
  };

  const createSubscriber = (emailSubscriber, callback, onFailure) => {
    if (new Date(emailSubscriber.signUpDate) > new Date())
      return onFailure(Error(412));
    EmailSubscriber.create(emailSubscriber, err => {
      if (err) return onFailure(Error(500));
      return callback();
    });
  };
  const deactivateEmail = (id, callback, onFailure) => {
    EmailSubscriber.replaceOne({ _id: id }, { active: false }, err => {
      if (err) return onFailure(Error(500));
      return callback();
    });
  };

  return {
    getAllAvailableEmails,
    getAllEmails,
    createSubscriber,
    deactivateEmail,
  };
};

module.exports = emailSubscribersService();
