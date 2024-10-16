const express = require("express");
const { handleGetBalance } = require("../controllers/accountController");

const router = express.Router();

router.get("/balance", handleGetBalance)

module.exports = router;