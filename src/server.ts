import express from "express";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const env = process.env.NODE_ENV || "development";

const DB_URL =
  env === "development"
    ? process.env.DB_DEV_URL
    : env === "test"
    ? process.env.DB_TEST_URL
    : process.env.DB_PROD_URL;

const sequelize = new Sequelize(DB_URL as string, {
  dialect: "postgres",
});

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log(`Connected to ${env} database 🚀`))
  .catch((err) => console.error("Database connection error:", err));

app.listen(3000, () => console.log("Server running on port 3000 🚀"));
