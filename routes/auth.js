const router = require("express").Router();
const fileUploader = require("./../config/cloudinary");
const User = require("./../model/User.js");
const bcrypt = require("bcrypt");

// Routes
router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  fileUploader.single("avatar"), //middleware to handle the decription of the req.body
  async (req, res, next) => {
    try {
      // getting all data from the form inputs
      const avatar = req.file ? req.file.path : undefined;
      const newUser = { ...req.body, avatar };
      console.log(newUser);

      // looking for this user in db
      const foundUser = await User.findOne({email: newUser.email});

      if (foundUser) {
        console.log("--- user found in db");
        req.flash("warning", "Email already registered");
        res.redirect("/auth/signin");
      }
      else {
        console.log("--- user not found in db");
        // hash + salt the password so it is not readable in db
        const hashedPassword = bcrypt.hashSync(newUser.password, +process.env.SALT);
        newUser.password = hashedPassword;
        console.log(newUser);

        await User.create(newUser);
        res.redirect("/dashboard");
      }
    } catch (err) {
      console.log('--- in the catch block', err)
      let errorMessage = "";
      for (field in err.errors) {
        errorMessage += err.errors[field].message + "\n";
      }
      req.flash("error", errorMessage);
      res.redirect("/auth/signup");
    }
  }
);

module.exports = router;
