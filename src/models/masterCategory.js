import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";
import MasterProductsModel from "./masterProducts.js";
import MasterSubCategoryModel from "./masterSubCategory.js";

const config = {
  tableName: TABLES.TAB_MASTER_CATEGORY,
  sequelize: sequelize,
  timestamps: false,
};

class MasterCategoryModel extends Model {}
MasterCategoryModel.init(
  {
    category_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    category_name: {
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
export default MasterCategoryModel;

MasterSubCategoryModel.belongsTo(MasterCategoryModel, {
  foreignKey: "category_id",
  as: "masterCategory",
});

MasterCategoryModel.hasMany(MasterSubCategoryModel, {
  foreignKey: "category_id",
  as: "masterSubCategory",
});
