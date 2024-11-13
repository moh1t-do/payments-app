const express = require("express");
const { handleGetBalance, handleTransfer } = require("../controllers/accountController");

const router = express.Router();

router.get("/balance", handleGetBalance)
router.post("/transfer", handleTransfer)

module.exports = router;