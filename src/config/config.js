"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || "development";
const configs = {
    development: {
        url: process.env.DB_DEV_URL,
        dialect: "postgres",
    },
    test: {
        url: process.env.DB_TEST_URL,
        dialect: "postgres",
    },
    production: {
        url: process.env.DB_PROD_URL,
        dialect: "postgres",
    },
};
module.exports = configs[env];
