//file m bs schema hi bnta mainly

const { name } = require("ejs");
const mongoose = require("mongoose");

const prod = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //name m extra spaces ht jayegii..schema m hi trim hojaye
    required: true, //prop jaruri hai deni
  },
  img: {
    type: String,
    trim: true,
    // default:
    //   "https://m.media-amazon.com/images/I/61Qsf4nQiZL.AC_UY327_FMwebp_QL65.jpg"
  },
  price: {
    type: Number,
    min: 0, //price positive
    required: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//middle ware used
//jb y middleware chlega tbh y function call hoga an y middle ware chlega koi product p jo delete krna
prod.post("findOneAndDelete", async function (product) {
  if (product.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});

let p1 = mongoose.model("Product", prod);
module.exports = p1; //require krk use
