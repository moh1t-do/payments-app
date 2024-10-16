const Account = require('../models/accountSchema');

async function handleGetBalance(req, res) {
    const userid = req.userid;
    try {
        const user = await Account.findOne({ userid: userid });
        res.json({ balance: user.balance });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
}

async function handleTransfer(req, res) {
    // start session
    const session = await Account.startSession();

    session.startTransaction();
    const { to, amount } = req.body;

    const account = await Account.findOne({ userid: req.userid }).session(session);

    if (!account || account.balance < amount) {
        session.endSession();
        return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userid: to }).session(session);

    if (!toAccount) {
        session.endSession();
        return res.status(400).json({ message: "Invalid recipient" });
    }

    // perform transfer
    await Account.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);

    // close session
    await session.commitTransaction();
    res.json({ message: "Transfer successful" });

}

module.exports = { handleGetBalance, handleTransfer };