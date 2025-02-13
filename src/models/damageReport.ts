// Model: Damage Reports
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
class DamageReport extends Model {
  public damage_id!: string;
  public item_id!: string;
  public reported_by!: string;
  public report_date!: Date;
  public damage_reason!: string;
  public status!: "Pending" | "Repaired" | "Disposed";
}

DamageReport.init(
  {
    damage_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "InventoryItems",
        key: "item_id"
      },
      onDelete: "CASCADE"
    },
    reported_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id"
      },
      onDelete: "CASCADE"
    },
    damage_reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    report_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    repair_status: {
      type: DataTypes.ENUM("Pending", "Repaired", "Disposed"),
      defaultValue: "Pending"
    }
  },
  {
    sequelize,
    modelName: "DamageReport",
    tableName: "DamageReports",
    timestamps: false
  }
);

export default DamageReport;
