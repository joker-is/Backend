const Schema = require('mongoose').Schema;

// Art -   title* (String),
//         artistId* (ObjectId),
//         date* (Date, defaults to now),
//         images (A list of    String),
//         description (String),
//         isAuctionItem (Boolean, defaults to false)

module.exports = new Schema({
  email: { type: String, required: true },
  signUpDate: { type: Date, required: true },
  active: { type: Boolean, required: true },
});
