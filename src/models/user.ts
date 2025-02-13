import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

class User extends Model {
  public user_id!: string;
  public full_name!: string;
  public email!: string;
  public password_hash!: string;
  public phone_number!: string;
  public role!: "Program Manager" | "Inventory Manager";
  public readonly created_at!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("Program Manager", "Inventory Manager"),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: false
  }
);

export default User;
