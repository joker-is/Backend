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
    EmailSubscriber.findById(id, (err, emailSubscriber) => {
      if (err) return onFailure(Error(500));
      if (emailSubscriber == null) return onFailure(Error(404));
      EmailSubscriber.replaceOne(
        { _id: id },
        { signUpDate: emailSubscriber.signUpDate },
        { email: emailSubscriber.email },
        { active: false },
        err => {
          if (err) return onFailure(Error(500));
          return callback();
        }
      );
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
