const ex = require("express");
const router = ex.Router(); //mini instance
const user = require("../models/User");
const passport = require("passport");

//showing form for new user to register
router.get("/register", (req, res) => {
  res.render("auth/signup");
});

//actually registering user in db
router.post("/register", async (req, res) => {
  let { username, email, password, role } = req.body;
  const User = new user({ email, username, role });
  const newu = await user.register(User, password);
  req.login(newu, function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "welcome");
    return res.redirect("/products");
  });
});

//login form show
router.get("/login", (req, res) => {
  res.render("auth/login");
});

//actually login->login kri info db se check hogi then authenticate
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login", //in case failure yhi redirect hoga
    failureMessage: true,
  }),
  (req, res) => {
    req.flash("success", "Here you go!!");
    res.redirect("/products");
  }
);

//logout
router.get("/logout", (req, res) => {
  () => {
    req.logout();
  };
  req.flash("success", "succesful logout");
  res.redirect("/login");
});

module.exports = router;
