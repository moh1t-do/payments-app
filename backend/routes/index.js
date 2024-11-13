const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use("/user", require("./userRoute"));
router.use("/account", authMiddleware, require("./accountRoute"));

module.exports = router;