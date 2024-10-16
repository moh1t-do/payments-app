const express = require("express");
const { handleSignUp, handleSignIn, handleUpdate, handleGetFilteredUsers } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.put("/update", authMiddleware, handleUpdate);
router.get("/bulk", authMiddleware, handleGetFilteredUsers);

module.exports = router;