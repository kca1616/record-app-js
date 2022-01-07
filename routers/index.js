const userRoutes = require("./user-router");
const { Router } = require("express");

const coreRouter = Router();
coreRouter.use("/users", userRoutes);

module.exports = { coreRouter };