const { name } = require("ejs");
const { string, required } = require("joi");
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

user.plugin(plm);

let u1 = mongoose.model("User", user);
module.exports = u1; //require krk use
