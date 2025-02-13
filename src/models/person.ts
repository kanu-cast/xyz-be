// Model: People (Trainees & Employees)
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

class Person extends Model {
  public person_id!: string;
  public full_name!: string;
  public national_id!: string;
  public email!: string;
  public phone_number!: string;
  public residence!: string;
  public assurer_name?: string;
  public assurer_contact?: string;
}

Person.init(
  {
    person_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
      allowNull: false
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
    }
  },
  {
    sequelize,
    modelName: "Person",
    tableName: "People",
    timestamps: false
  }
);

export default Person;
