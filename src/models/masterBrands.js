import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";
import MasterProductsModel from "./masterProducts.js";

const config = {
  tableName: TABLES.TAB_MASTER_BRANDS,
  sequelize: sequelize,
  timestamps: false,
};

class MasterBrandsModel extends Model {}
MasterBrandsModel.init(
  {
    brand_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    brand_name: {
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
export default MasterBrandsModel;

MasterProductsModel.belongsTo(MasterBrandsModel, {
  foreignKey: "brand_id",
  as: "productBrand",
});
