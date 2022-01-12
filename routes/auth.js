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
      console.log(req.body);
      const avatar = req.file ? req.file.path : undefined;
      const newUser = { ...req.body, avatar };
      console.log(newUser);
      await User.create(newUser);
      res.redirect("/dashboard");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
