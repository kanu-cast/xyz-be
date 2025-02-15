import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";

interface ActionAttributes {
  action_id: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ActionCreationAttributes
  extends Optional<ActionAttributes, "action_id"> {}

class Action
  extends Model<ActionAttributes, ActionCreationAttributes>
  implements ActionAttributes
{
  public action_id!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Action.init(
  {
    action_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: "Action",
    tableName: "actions"
  }
);

export default Action;
