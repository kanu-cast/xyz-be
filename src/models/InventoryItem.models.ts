import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/db.config";
import Borrowing from "./Borrowing.models";
import DamageReport from "./DamageReport.models";
import SystemLog from "./SystemLog.models";

interface InventoryItemAttributes {
  item_id: string;
  name: string;
  description: string;
  category: "Device" | "Furniture" | "Cleaning Material" | "Food Utensil";
  serial_number?: string;
  condition: "new" | "good" | "worn out" | "broken";
  status: "available" | "borrowed" | "damaged" | "disposed";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryItemCreationAttributes
  extends Optional<InventoryItemAttributes, "item_id"> {}

class InventoryItem
  extends Model<InventoryItemAttributes, InventoryItemCreationAttributes>
  implements InventoryItemAttributes
{
  static initialize(sequelize: Sequelize) {
    throw new Error("Method not implemented.");
  }
  public item_id!: string;
  public name!: string;
  public description!: string;
  public category!:
    | "Device"
    | "Furniture"
    | "Cleaning Material"
    | "Food Utensil";
  public serial_number!: string;
  public condition!: "new" | "good" | "worn out" | "broken";
  public status!: "available" | "borrowed" | "damaged" | "disposed";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InventoryItem.init(
  {
    item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        "Device",
        "Furniture",
        "Cleaning Material",
        "Food Utensil"
      ),
      allowNull: false
    },
    condition: {
      type: DataTypes.ENUM("new", "good", "worn out", "broken"),
      allowNull: false,
      defaultValue: "new"
    },
    serial_number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("available", "borrowed", "damaged"),
      allowNull: false,
      defaultValue: "available"
    }
  },
  {
    sequelize,
    modelName: "InventoryItem",
    tableName: "inventoryItems"
  }
);

export default InventoryItem;
