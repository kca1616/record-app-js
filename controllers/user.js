const { User } = require("../models");

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            throw Error("bad request, no user id");
        }
        const user = await User.findByPk(id);

        if (!user) {
            throw Error("no user found");
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users || users.length === 0) {
            throw Error("no users found");
        }

        return res.status(200).json({ data: users });
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }
};

const makeUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await User.create({ username, email, password });
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }
};
const editUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        if (!id) {
            throw Error("bad request, no user id");
        }

        const update = { username, email, password };
        const newUser = await User.update(update, {
            where: {
                id
            }
        });
        if (!newUser || newUser.length === 0) {
            throw Error("bad request, no user id");
        }
        return res.status(200).json({ data: newUser });
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            throw Error("bad request, no user id");
        }
        const user = await User.destroy({
            where: {
                id
            }
        });

        if (!user) {
            throw Error("no user found");
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        return res.status(400).json({ errors: error.message });
    }
};

module.exports = { getUser, getUsers, makeUser, editUser, deleteUser };