const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./utils/connectToDB");

// routes
const v1Router = require("./routes");

dotenv.config();

const CLIENT_URL = process.env.CLINET_URL;
const SERVER_PORT = process.env.SERVER_PORT;
const DB_URL = process.env.DB_URL;
const app = express();

connectToDB(DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT_URL,
}))

app.use("/api/v1", v1Router);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});

const port = process.env.SERVER_PORT

