const { pschema, rschema } = require("./Schema");
const Product = require("./models/Product");

//validatep,validater are acting as middle wares
const validatep = (req, res, next) => {
  let { name, img, price, desc } = req.body || {};

  const { error } = pschema.validate({ name, img, price, desc });
  if (error) {
    return res.render("error", { err: error });
  }
  next(); //after validating
};

const validater = (req, res, next) => {
  let { rating, comment } = req.body;
  const { error } = rschema.validate({ rating, comment });
  if (error) {
    return res.render("error");
  }
  next(); //after validating
};

const islogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "login first");
    return res.redirect("/login");
  }
  next();
};

const isseller = (req, res, next) => {
  if (!req.user.role) {
    req.flash("error", "Don't have access ");
    return res.redirect("/products");
  } else if (req.user.role === "buyer") {
    req.flash("error", "Don't have access ");
    return res.redirect("/products");
  }
  next();
};

const isproductauthor = async (req, res, next) => {
  let { id } = req.params;
  let pr = await Product.findById(id); //entire product
  if (!pr.author.equals(req.user._id)) {
    req.flash("error", "Don't have access ");
    return res.redirect("/products");
  }
  next();
};

module.exports = { isproductauthor, isseller, islogged, validatep, validater };
