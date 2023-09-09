import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";
import MasterCategoryModel from "./masterCategory.js";

const config = {
  tableName: TABLES.TAB_MASTER_PRODUCTS,
  sequelize: sequelize,
  timestamps: false,
};

class MasterProductsModel extends Model {}
MasterProductsModel.init(
  {
    product_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    sub_category_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    product_rating: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    is_veg: {
      type: DataTypes.BOOLEAN,
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
export default MasterProductsModel;
