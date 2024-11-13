const mongoose = require('mongoose');
const Account = require('../models/accountSchema');

async function handleGetBalance(req, res) {
    const userid = req.userid;
    try {
        const user = await Account.findOne({ userid: new mongoose.Types.ObjectId(userid) });
        res.json({ balance: user.balance });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
}

async function handleTransfer(req, res) {
    const userid = req.userid;
    const { to, amount } = req.body;

    // Start a session
    const session = await mongoose.startSession();

    try {
        // Start a transaction
        session.startTransaction();

        // Fetch the sender's account
        const account = await Account.findOne({ userid: new mongoose.Types.ObjectId(userid) }).session(session);
        if (!account || account.balance < amount) {
            throw new Error("Insufficient balance");
        }

        // Fetch the recipient's account
        const toAccount = await Account.findOne({ userid: new mongoose.Types.ObjectId(to) }).session(session);
        if (!toAccount) {
            throw new Error("Invalid recipient");
        }

        // Perform the transfer
        await Account.updateOne(
            { userid: new mongoose.Types.ObjectId(userid) },
            { $inc: { balance: -amount } },
            { session }
        );

        await Account.updateOne(
            { userid: new mongoose.Types.ObjectId(to) },
            { $inc: { balance: amount } },
            { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        // Abort the transaction on error
        await session.abortTransaction();
        console.error(error);
        res.status(400).json({ message: error.message });
    } finally {
        // End the session
        session.endSession();
    }
}


module.exports = { handleGetBalance, handleTransfer };