const { AdminUser } = require('../data/db');
const Bcrypt = require('bcrypt');

const adminUserService = () => {
  const createAdminUser = (body, callback, onFailure) => {
    mainAdminUser = {
      username: body.mainUsername,
      password: body.mainPassword,
    };
    hashAdminUser = {
      username: body.username,
      hashed_password: Bcrypt.hashSync(body.password, 10),
      active: true,
    };
    AdminUser.findOne({ username: mainAdminUser.username }, function(
      err,
      dbAdminUser
    ) {
      if (err) return onFailure(Error(500));
      if (dbAdminUser === null) {
        return onFailure(Error(401)); //NO adminUser with mainUsername
      }
      if (!dbAdminUser.active) {
        return onFailure(Error(401)); //adminUser with mainUsername is not active
      }
      if (
        !Bcrypt.compareSync(mainAdminUser.password, dbAdminUser.hashed_password)
      ) {
        return onFailure(Error(401)); //adminUser with mainUsername password incorrect
      }
      AdminUser.findOne({ username: hashAdminUser.username }, function(
        err,
        dbHashAdminUser
      ) {
        if (err) return onFailure(Error(500));
        if (dbHashAdminUser !== null) {
          if (dbHashAdminUser.active) {
            return onFailure(Error(401)); //Already adminUser with this username is active
          }
          const doc = {
            username: dbHashAdminUser.username,
            hashed_password: hashAdminUser.hashed_password,
            active: true,
          };
          AdminUser.updateOne({ _id: dbHashAdminUser._id }, doc, err => {
            if (err) return onFailure(Error(500));
            console.log('hi');
            return callback();
          });
        } else {
          AdminUser.create(hashAdminUser, err => {
            //Create new adminUser
            if (err) return onFailure(Error(500));
            console.log('hi2');
            return callback();
          });
        }
      });
    });
  };

  const loginAdminUser = (adminUser, callback, onFailure) => {
    AdminUser.findOne({ username: adminUser.username }, function(
      err,
      dbAdminUser
    ) {
      if (err) return onFailure(Error(500));
      if (!dbAdminUser.active) {
        return onFailure(Error(401));
      }
      if (
        !Bcrypt.compareSync(adminUser.password, dbAdminUser.hashed_password)
      ) {
        return onFailure(Error(401));
      }
      return callback();
    });
  };

  const deactivateAdminUser = (adminUser, callback, onFailure) => {
    AdminUser.findOne({ username: adminUser.username }, function(
      err,
      dbAdminUser
    ) {
      if (err) return onFailure(Error(500));
      if (!dbAdminUser.active) {
        return onFailure(Error(412));
      }
      if (
        !Bcrypt.compareSync(adminUser.password, dbAdminUser.hashed_password)
      ) {
        return onFailure(Error(401));
      }
      const doc = {
        username: dbAdminUser.username,
        hashed_password: dbAdminUser.hashed_password,
        active: false,
      };
      AdminUser.updateOne({ _id: dbAdminUser._id }, doc, err => {
        if (err) return onFailure(Error(500));
        return callback();
      });
    });
  };

  return {
    createAdminUser,
    loginAdminUser,
    deactivateAdminUser,
  };
};

module.exports = adminUserService();
