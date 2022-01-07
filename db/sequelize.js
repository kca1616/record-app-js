const { Sequelize } = require('sequelize');
const { User, UserAttributes } = require('../models/User');
const { usersData } = require("../seeder/data")

const options = {
    dialect: "postgres",
    database: process.env.PG_DATABASE,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: "172.21.0.1",
    port: 5432,
    define: {
        timestamps: false
    },
    retry: {
        max: 5
    },
};

function startDatabase() {
    const sequelize = new Sequelize(options);

    User.init(UserAttributes, { sequelize });

    if (process.env.NODE_ENV !== "production") {
        sequelize.sync({ force: true })
            .then(() => {
                User.bulkCreate(usersData);
            })
    } else {
        sequelize.sync();
    }

    return sequelize;
}

module.exports = startDatabase;