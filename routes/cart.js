const ex = require("express");
const router = ex.Router();
const { islogged } = require("../middleware");
const product = require("../models/Product");
const user = require("../models/User");
const { route } = require("./product");

//route to see cart
router.get("/user/cart", islogged, async (req, res) => {
  let u = await user.findById(req.user._id).populate("cart");
  res.render("cart/cart", { u });
});

//actually adding product into cart
router.post("/user/:productid/add", islogged, async (req, res) => {
  let { productid } = req.params;
  let userid = req.user._id;
  let prod = await product.findById(productid);
  let u = await user.findById(userid);
  u.cart.push(prod);
  await u.save();
  res.redirect("/user/cart");
});

module.exports = router;
