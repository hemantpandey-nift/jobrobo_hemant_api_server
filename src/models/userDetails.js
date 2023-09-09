import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";

const config = {
  tableName: TABLES.TAB_USER_DETAILS,
  sequelize: sequelize,
  timestamps: false,
};

class UserDetailsModel extends Model {}
UserDetailsModel.init(
  {
    login_id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    login_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_logged_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    creation: {
      type: DataTypes.NOW,
      defaultValue: DataTypes.NOW,
    },
    modified: {
      type: DataTypes.NOW,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  config
);
export default UserDetailsModel;
