import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import { TABLES } from "../constants/tabels.js";
import MasterProductsModel from "./masterProducts.js";

const config = {
  tableName: TABLES.TAB_PRODUCT_VARIANTS,
  sequelize: sequelize,
  timestamps: false,
};

class ProductVariantsModel extends Model {}
ProductVariantsModel.init(
  {
    product_variant_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    packaging_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    discount_percent: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    product_image: {
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
export default ProductVariantsModel;

MasterProductsModel.belongsTo(ProductVariantsModel, {
  foreignKey: "product_id",
  targetKey: "product_id",
  as: "productVariants",
});
