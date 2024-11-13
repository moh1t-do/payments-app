const express = require("express");
const { handleSignUp, handleSignIn, handleUpdate, handleGetFilteredUsers, handleVerifyToken } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.put("/update", authMiddleware, handleUpdate);
router.get("/bulk", authMiddleware, handleGetFilteredUsers);
router.post("/verify", handleVerifyToken);

module.exports = router;