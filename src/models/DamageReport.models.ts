import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/db.config";
import InventoryItem from "./InventoryItem.models";
import User from "./User.models";
import Borrowing from "./Borrowing.models";

interface DamageReportAttributes {
  report_id: string;
  item_id: string;
  description: string;
  status: "pending" | "repaired" | "under repair" | "disposed";
  reported_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DamageReportCreationAttributes
  extends Optional<DamageReportAttributes, "report_id"> {}

class DamageReport
  extends Model<DamageReportAttributes, DamageReportCreationAttributes>
  implements DamageReportAttributes
{
  static initialize(sequelize: Sequelize) {
    throw new Error("Method not implemented.");
  }
  public report_id!: string;
  public item_id!: string;
  public description!: string;
  public status!: "pending" | "repaired" | "under repair" | "disposed";
  public reported_at!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DamageReport.init(
  {
    report_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: InventoryItem, key: "item_id" }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "repaired", "disposed"),
      allowNull: false,
      defaultValue: "pending"
    },
    reported_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: "DamageReport",
    tableName: "damageReports"
  }
);
console.log(User); // Should log a Sequelize model class
console.log(InventoryItem); // Should log a Sequelize model class
console.log(Borrowing);

// DamageReport.belongsTo(User, { foreignKey: "reported_by" });
// DamageReport.belongsTo(InventoryItem, { foreignKey: "item_id" });
// DamageReport.belongsTo(Borrowing, { foreignKey: "borrowing_id" });

export default DamageReport;
