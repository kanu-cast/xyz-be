import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/db.config";
import Borrowing from "./Borrowing.models";
import SystemLog from "./SystemLog.models";
import DamageReport from "./DamageReport.models";
import Person from "./Person.models";

interface UserAttributes {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "user_id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  static initialize(sequelize: Sequelize) {
    throw new Error("Method not implemented.");
  }
  public user_id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "employee";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users"
  }
);

export default User;
