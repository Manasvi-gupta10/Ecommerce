const ex = require("express");
const router = ex.Router(); //mini instance
const prod = require("../models/Product");
const Review = require("../models/Review");
const {
  validatep,
  islogged,
  isseller,
  isproductauthor,
} = require("../middleware");

//show existing products
router.get("/products", async (req, res) => {
  try {
    let p = await prod.find({});
    res.render("products/index", { p });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

//show form for new
router.get("/product/new", islogged, isseller, (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

router.use(ex.urlencoded({ extended: true }));

//add product to database
//here validatep used means ki jb y route hit hua toh jo middleware humne bnaya wo require kia wo chla jb sbh shi toh uske last m nexts jo jha function likha async wla wo chl jayega
router.post("/products", validatep, islogged, isseller, async (req, res) => {
  try {
    let { name, img, price, desc } = req.body;
    await prod.create({ name, img, price, desc, author: req.user._id }); //here author m wo jo user currently logged hai wo req.user s ayega n ki destructure krke
    req.flash("success", "Product added");
    res.redirect("/products");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

//show particular product

router.get("/products/:id", islogged, async (req, res) => {
  try {
    let { id } = req.params;
    let found = await prod.findById(id).populate("reviews");
    res.render("products/show", { found, msg: req.flash("msg") });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

//edit a product k liye form
router.get(
  "/products/:id/edit",
  islogged,
  isseller,
  isproductauthor,
  async (req, res) => {
    try {
      let { id } = req.params;
      let found = await prod.findById(id);

      res.render("products/edit", { found });
    } catch (e) {
      res.status(500).render("error", { err: e.message });
    }
  }
);

//actuaaly edit data
router.patch(
  "/products/:id",
  validatep,
  islogged,
  isseller,
  isproductauthor,
  async (req, res) => {
    try {
      let { id } = req.params;

      let { name, img, price, desc } = req.body;
      await prod.findByIdAndUpdate(id, { name, img, price, desc });
      req.flash("success", "Product edited");
      res.redirect(`/products/${id}`);
    } catch (e) {
      res.status(500).render("error", { err: e.message });
    }
  }
);

//delete a product
router.delete(
  "/products/:id",
  islogged,
  isseller,
  isproductauthor,
  async (req, res) => {
    try {
      let { id } = req.params;
      const pr = await prod.findById(id);
      // for (let i of pr.reviews) {
      //   //har ek review p iterate krke usse delete krenge
      //   await Review.findByIdAndDelete(i);
      // }
      await prod.findByIdAndDelete(id);
      req.flash("success", "Product deleted");
      res.redirect("/products");
    } catch (e) {
      res.status(500).render("error", { err: e.message });
    }
  }
);

module.exports = router;
