require("dotenv").config()
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 90000,
      useUTC: false,
      dateStrings: true,
      typeCast: true
    },
    pool: {
      max: 150,
      min: 0,
      idle: 200000,
      acquire: 1000000
    },
    logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 90000,
      useUTC: false,
      dateStrings: true,
      typeCast: true
    },
    pool: {
      max: 150,
      min: 0,
      idle: 200000,
      acquire: 1000000
    },
    logging: true,
  },
}
