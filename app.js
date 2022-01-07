const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const startDatabase = require("./db/sequelize");
const { coreRouter } = require("./routers/index");

function provision() {
    const app = express();
    const instance = startDatabase();
    instance.authenticate();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use("/api", coreRouter);

    app.get("/status", (req, res) => {
        res.status(200).json({ message: "success" });
    });

    return app;
}

module.exports = provision;