import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import User from "./User.models";

interface PersonAttributes {
  person_id: string;
  full_name: string;
  national_id: string;
  email: string;
  phone_number: string;
  residence: string;
  assurer_name?: string;
  assurer_contact?: string;
  role: "trainee" | "employee";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PersonCreationAttributes
  extends Optional<PersonAttributes, "person_id"> {}

class Person
  extends Model<PersonAttributes, PersonCreationAttributes>
  implements PersonAttributes
{
  public person_id!: string;
  public full_name!: string;
  public national_id!: string;
  public email!: string;
  public phone_number!: string;
  public residence!: string;
  public assurer_name?: string;
  public assurer_contact?: string;
  public role!: "trainee" | "employee";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Person.init(
  {
    person_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    national_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    residence: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    assurer_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assurer_contact: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM("trainee", "employee"),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Person",
    tableName: "peoples"
  }
);

export default Person;
