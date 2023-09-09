import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";
import ProductVariantsModel from "./productVariants.js";

const config = {
  tableName: TABLES.TAB_MASTER_PACKAGING,
  sequelize: sequelize,
  timestamps: false,
};

class MasterPackagingModel extends Model {}
MasterPackagingModel.init(
  {
    packaging_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    packaging_desc: {
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
export default MasterPackagingModel;

ProductVariantsModel.belongsTo(MasterPackagingModel, {
  foreignKey: "packaging_id",
  as: "variantPackaging",
});
