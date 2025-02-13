import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { v4 as uuidv4 } from "uuid";

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
      defaultValue: uuidv4, // Generate a unique ID
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
      references: { model: "Actions", key: "action_id" } // Action lookup table
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: true, // Optional, since some logs may not be item-specific
      references: { model: "InventoryItems", key: "item_id" }
    },
    borrow_id: {
      type: DataTypes.UUID,
      allowNull: true, // Only for borrow-related actions
      references: { model: "Borrowings", key: "borrow_id" }
    },
    damage_id: {
      type: DataTypes.UUID,
      allowNull: true, // Only for damage-related actions
      references: { model: "DamageReports", key: "damage_id" }
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Auto-generate timestamp
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "system_logs",
    timestamps: false
  }
);

export default SystemLog;
