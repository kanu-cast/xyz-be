"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Dynamically import all model files
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js") ||
      (file.slice(-3) === ".ts" && file.indexOf(".test.js") === -1)
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Centralized associations
const { User, InventoryItem, Borrowing, DamageReport } = db;

// Define associations
DamageReport.belongsTo(User, { foreignKey: "reported_by" });
DamageReport.belongsTo(InventoryItem, { foreignKey: "item_id" });
DamageReport.belongsTo(Borrowing, { foreignKey: "borrowing_id" });

Action.hasMany(SystemLog, { foreignKey: "action_id" });

Borrowing.belongsTo(User, { foreignKey: "user_id" });
Borrowing.belongsTo(InventoryItem, { foreignKey: "item_id" });
Borrowing.hasOne(DamageReport, { foreignKey: "borrowing_id" });

InventoryItem.hasMany(Borrowing, { foreignKey: "item_id" });
InventoryItem.hasMany(DamageReport, { foreignKey: "item_id" });
InventoryItem.hasMany(SystemLog, { foreignKey: "item_id" });

Person.belongsTo(User, { foreignKey: "created_by" });

SystemLog.belongsTo(User, { foreignKey: "user_id" });
SystemLog.belongsTo(InventoryItem, { foreignKey: "item_id" });
SystemLog.belongsTo(Action, { foreignKey: "action_id" });

User.hasMany(Borrowing, { foreignKey: "user_id" });
User.hasMany(SystemLog, { foreignKey: "user_id" });
User.hasMany(DamageReport, { foreignKey: "reported_by" });
User.hasMany(Person, { foreignKey: "created_by" });

// Optional: If you still want to use the `associate` function in models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
