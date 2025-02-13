import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { v4 as uuidv4 } from "uuid";
import User from "./User.models";
import InventoryItem from "./InventoryItem.models";
import Action from "./action.models";

class SystemLog extends Model {
  public log_id!: string;
  public user_id!: string;
  public action_id!: string;
  public item_id!: string | null;
  public borrow_id!: string | null;
  public damage_report_id!: string | null;
  public timestamp!: Date;
}
SystemLog.init(
  {
    log_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "user_id" }
    },
    action_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Actions", key: "action_id" }
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "InventoryItems", key: "item_id" }
    },
    borrow_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "Borrowings", key: "borrow_id" }
    },
    damage_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "DamageReports", key: "damage_id" }
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "system_logs",
    timestamps: false
  }
);
SystemLog.belongsTo(User, { foreignKey: "user_id" });
SystemLog.belongsTo(InventoryItem, { foreignKey: "item_id" });
SystemLog.belongsTo(Action, { foreignKey: "action_id" });

export default SystemLog;
