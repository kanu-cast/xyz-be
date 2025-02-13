// Model: Inventory Item
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

class InventoryItem extends Model {
  public item_id!: string;
  public name!: string;
  public category!:
    | "Device"
    | "Furniture"
    | "Cleaning Material"
    | "Food Utensil";
  public serial_number!: string;
  public condition!: "New" | "Good" | "Worn Out" | "Broken";
  public status!: "Available" | "Borrowed" | "Damaged" | "Disposed";
  public readonly created_at!: Date;
}

InventoryItem.init(
  {
    item_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    serial_number: {
      type: DataTypes.STRING,
      unique: true
    },
    condition: {
      type: DataTypes.ENUM("New", "Good", "Worn Out", "Broken"),
      defaultValue: "New"
    },
    status: {
      type: DataTypes.ENUM("Available", "Borrowed", "Damaged", "Disposed"),
      defaultValue: "Available"
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: "InventoryItem",
    tableName: "InventoryItems",
    timestamps: false
  }
);

export default InventoryItem;
