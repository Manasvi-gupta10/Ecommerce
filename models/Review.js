const { name } = require("ejs");
const mongoose = require("mongoose");

const review = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

let r1 = mongoose.model("Review", review);
module.exports = r1; //require krk use
