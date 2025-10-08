const ex = require("express");
const router = ex.Router(); //mini instance
const prod = require("../models/Product");
const Review = require("../models/Review");
const { validater } = require("../middleware");

router.use(ex.urlencoded({ extended: true }));

router.post("/products/:id/review", validater, async (req, res) => {
  try {
    let { rating, comment } = req.body;
    let { id } = req.params;
    const found = await prod.findById(id);
    const review = new Review({ rating, comment });
    found.reviews.push(review);
    await review.save();
    await found.save();
    req.flash("success", "review added");
    res.redirect(`/products/${id}`);
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

module.exports = router;
