import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/db.config";
import User from "./User.models";
import InventoryItem from "./InventoryItem.models";
import DamageReport from "./DamageReport.models";

interface BorrowingAttributes {
  borrowing_id: string;
  user_id: string;
  item_id: string;
  borrowed_at: Date;
  returned_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  assigned_by: string;
  expected_return_date: Date;
  initial_condition: "new" | "good" | "worn out" | "broken";
  return_condition: "new" | "good" | "worn out" | "broken";
  is_overdue: boolean;
}

export interface BorrowingCreationAttributes
  extends Optional<BorrowingAttributes, "borrowing_id"> {}

class Borrowing
  extends Model<BorrowingAttributes, BorrowingCreationAttributes>
  implements BorrowingAttributes
{
  static initialize(sequelize: Sequelize) {
    throw new Error("Method not implemented.");
  }
  public borrowing_id!: string;
  public user_id!: string;
  public item_id!: string;
  public borrowed_at!: Date;
  public returned_at?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public assigned_by!: string;
  public expected_return_date!: Date;
  public initial_condition!: "new" | "good" | "worn out" | "broken";
  public return_condition!: "new" | "good" | "worn out" | "broken";
  public is_overdue!: boolean;
}

Borrowing.init(
  {
    borrowing_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "user_id" }
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: InventoryItem, key: "item_id" }
    },
    assigned_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "user_id" }
    },
    borrowed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    expected_return_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returned_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    initial_condition: {
      type: DataTypes.ENUM("new", "good", "worn out", "broken"),
      allowNull: false,
      defaultValue: "available"
    },
    return_condition: {
      type: DataTypes.ENUM("new", "good", "worn out", "broken"),
      allowNull: false,
      defaultValue: "available"
    },
    is_overdue: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: "Borrowing",
    tableName: "borrowings"
  }
);

export default Borrowing;
