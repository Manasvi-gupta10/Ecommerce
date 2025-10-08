const ex = require("express");
const app = ex();
const path = require("path");
const seed = require("./seed");
const prodroute = require("./routes/product");
const ejsmate = require("ejs-mate");
const mth = require("method-override");
const reviewroute = require("./routes/review");
const flash = require("connect-flash");
const session = require("express-session");
const authroute = require("./routes/auth");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/User");
const cartroute = require("./routes/cart");

app.use(mth("_method"));
app.use(ex.urlencoded({ extended: true }));

let configs = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httponly: true,
    //     ✅ID hai in cookie" (user ke browser me)
    // ✅ "Wo ID hai session me" (server pe bhi session data stored hai)

    //itne time tk id rhi yani sever pehchanlega
    //expire means abhi se kb tk expire hoga
    expires: Date.now() + 24 * 7 * 60 * 60 * 1000,

    //max time kb tk chlega cookie
    maxAge: 24 * 7 * 60 * 60 * 1000,
  },
};

//ejs file kese read hogi
app.engine("ejs", ejsmate); //jo engine use hoga ejs file read krne k liye woo ejs-mate hoga ab instaed of simple ejs
app.set("view engine", "ejs"); //render hogi tempelate k liye toh ejs wli
app.set("views", path.join(__dirname, "views"));

app.use(ex.static(path.join(__dirname, "public")));

app.use(session(configs));

app.use(flash());

passport.use(new LocalStrategy(user.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
  res.locals.curuser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//seeding data
// seed();

app.use(prodroute); //har incomming request p chlega
app.use(reviewroute);
app.use(authroute);
app.use(cartroute);

app.listen(8080, () => {
  console.log("server connected");
});

const mn = require("mongoose");
const { config } = require("process");
mn.connect("mongodb://127.0.0.1:27017/shopping")
  .then(() => {
    console.log("db connected");
  })
  .catch((er) => {
    console.log("db error");
    console.log(er);
  });
