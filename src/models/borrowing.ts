import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

// Model: Borrowing
class Borrowing extends Model {
  public borrow_id!: string;
  public item_id!: string;
  public borrower_id!: string;
  public assigned_by!: string;
  public borrow_date!: Date;
  public expected_return_date!: Date;
  public return_date?: Date;
  public initial_condition!: "New" | "Good" | "Worn Out" | "Broken";
  public return_condition?: "New" | "Good" | "Worn Out" | "Broken";
  public is_overdue!: boolean;
}

Borrowing.init(
  {
    borrow_id: {
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
    borrower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "People",
        key: "person_id"
      },
      onDelete: "CASCADE"
    },
    assigned_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id"
      },
      onDelete: "CASCADE"
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expected_return_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    initial_condition: {
      type: DataTypes.ENUM("New", "Good", "Worn Out", "Broken"),
      defaultValue: "Good"
    },
    return_condition: {
      type: DataTypes.ENUM("New", "Good", "Worn Out", "Broken"),
      allowNull: true
    },
    is_overdue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: "Borrowing",
    tableName: "Borrowings",
    timestamps: false
  }
);

export default Borrowing;
