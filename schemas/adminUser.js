const Schema = require('mongoose').Schema;

module.exports = new Schema({
  username: { type: String, required: true },
  hashed_password: { type: String, required: true },
  active: { type: Boolean, required: true },
});

// const Mongoose = require('mongoose');
// const Schema = Mongoose.Schema;
// const bcrypt = require('bcrypt');
// const SALT_WORK_FACTOR = 10;

// // define User Schema
// const UserSchema = new Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   hashed_password: {
//     type: String,
//     required: true,
//   },
//   active: { type: Boolean, default: true },
// });

// // Virtuals
// UserSchema.virtual('password')
//   // set methods
//   .set(function(password) {
//     this._password = password;
//   });

// UserSchema.pre('save', function(next) {
//   // store reference
//   const user = this;
//   if (user._password === undefined) {
//     return next();
//   }
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) console.log(err);
//     // hash the password using our new salt
//     bcrypt.hash(user._password, salt, function(err, hash) {
//       if (err) console.log(err);
//       user.hashed_password = hash;
//       next();
//     });
//   });
// });

// /**
//  * Methods
//  */
// UserSchema.methods = {
//   comparePassword: function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//     });
//   },
// };

// const AdminUserSchema = Mongoose.model('user', UserSchema);

// module.export = AdminUserSchema;

// // const Mongoose = require('mongoose');

// // const UserSchema = new Mongoose.Schema({
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   active: { type: Boolean, required: true },
// // });

// // UserSchema.pre('save', function(next) {
// //   // Check if document is new or a new password has been set
// //   if (this.isNew || this.isModified('password')) {
// //     // Saving reference to this because of changing scopes
// //     const document = this;
// //     bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
// //       if (err) {
// //         next(err);
// //       } else {
// //         document.password = hashedPassword;
// //         next();
// //       }
// //     });
// //   } else {
// //     next();
// //   }
// // });

// // const AdminUserSchema = new Mongoose.model('user', UserSchema);

// // module.export = AdminUserSchema;
