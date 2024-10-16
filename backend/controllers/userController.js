const z = require('zod');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userSchema');
const Account = require('../models/accountSchema');

dotenv.config();

const authSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    firstname: z.string().min(1, "Firstname cannot be empty"),
    lastname: z.string().min(1, "Lastname cannot be empty"),
    password: z.string().min(1, "Password cannot be empty")
});

const authUpdateSchema = z.object({
    username: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional()
});

function generateToken(userid) {
    return jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

}


async function handleSignUp(req, res) {
    const body = req.body;
    const { success } = authSchema.safeParse(body);
    if (!success) {
        res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const user = await User.findOne({ username: body.username });
        if (user) {
            res.status(400).json({ error: 'User already exists' });
        } else {
            const newuser = await User.create(body);
            await Account.create({ balance: Math.random() * 1000, user: newuser._id });
            const token = generateToken(newuser._id);
            res.status(201).json({
                message: 'User created successfully',
                token
            });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
}

async function handleSignIn(req, res) {
    const body = req.body;
    const { success } = authSchema.safeParse(body);

    if (!success) {
        res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const user = await User.findOne({ username: body.username });
        if (user) {
            if (user.password === body.password) {
                const token = generateToken(user._id);
                res.status(200).json({
                    message: 'User signed in successfully',
                    token
                });
            } else {
                res.status(400).json({ error: 'Invalid password' });
            }
        }
        else {
            res.status(400).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });

    }
}

function handleUpdate(req, res) {
    const body = req.body;
    const { success } = authUpdateSchema.safeParse(body);

    if (!success) {
        res.status(400).json({ error: 'Invalid request body' });
    }

    const userid = req.userid;
    User.findByIdAndUpdate(userid, body, { new: true }, (error, user) => {
        if (error) {
            res.status(400).json({ error: error });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    });
}

async function handleGetFilteredUsers(req, res) {
    const filter = req.query.filter || '';

    const users = await User.find({
        $or: [
            { firstname: { $regex: filter, } },
            { lastname: { $regex: filter, } }
        ]
    });

    res.json({
        users: users.map(user => ({
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        }))
    })
}

module.exports = { handleSignIn, handleSignUp, handleUpdate, handleGetFilteredUsers };