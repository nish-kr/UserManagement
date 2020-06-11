const express = require("express");
const router = express.Router();
const User = require("../controller/user.controller");
const multer = require("multer");

var image = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    req.body.image = file.originalname;
    cb(null, req.body.image);
  },
});

var upload = multer({
  storage: image,
});

router.post("/saveUser", upload.single("image"), User.saveUser);
router.post("/editUser", User.editUser);
router.post("/deleteUser", User.deleteUser);
router.get("/getAllUser", User.getAllUsers);
router.post("/getDetails", User.getDetails);

module.exports = router;
