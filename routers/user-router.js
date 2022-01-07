const { Router } = require('express');
const user = require("../controllers/user");

const userRoutes = Router();

userRoutes.post("/", user.makeUser);
userRoutes.get("/", user.getUsers);
userRoutes.get("/:id", user.getUser);
userRoutes.put("/:id", user.editUser);
userRoutes.delete("/:id", user.deleteUser);

module.exports = userRoutes;