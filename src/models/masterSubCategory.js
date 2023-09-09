import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";
import MasterProductsModel from "./masterProducts.js";

const config = {
  tableName: TABLES.TAB_MASTER_SUB_CATEGORY,
  sequelize: sequelize,
  timestamps: false,
};

class MasterSubCategoryModel extends Model {}
MasterSubCategoryModel.init(
  {
    sub_category_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    sub_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
export default MasterSubCategoryModel;

MasterProductsModel.belongsTo(MasterSubCategoryModel, {
  foreignKey: "sub_category_id",
  as: "productSubCategory",
});
