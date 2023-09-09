import { Op } from "sequelize";
import { MESSAGES } from "../../constants/index.js";
import MasterCategoryModel from "../../models/masterCategory.js";
import MasterPackagingModel from "../../models/masterPackaging.js";
import MasterProductsModel from "../../models/masterProducts.js";
import MasterSubCategoryModel from "../../models/masterSubCategory.js";
import ProductVariantsModel from "../../models/productVariants.js";

export const findCategoryTopProducts = async (category_id) => {
  try {
    console.log("category_id-------------", category_id);
    const responseData = await MasterProductsModel.findAll({
      attributes: [
        "product_id",
        "product_name",
        "product_rating",
        "is_veg",
        "sub_category_id",
      ],
      where: { isDeleted: 0 },
      include: [
        {
          model: MasterSubCategoryModel,
          attributes: ["sub_category_name", "category_id"],
          as: "productSubCategory",
          required: true,
          include: [
            {
              model: MasterCategoryModel,
              attributes: ["category_name"],
              as: "masterCategory",
              where: { category_id: category_id },
            },
          ],
        },
      ],
      order: [["product_rating", "DESC"]],
      limit: 5,
      raw: true,
      nest: true,
    });
    return responseData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA);
  }
};

export const findProductVariants = async (products) => {
  try {
    const responseData = await ProductVariantsModel.findAll({
      attributes: [
        "product_id",
        "product_variant_id",
        "packaging_id",
        "product_price",
        "discount_percent",
        "product_image",
      ],
      where: { isDeleted: 0, product_id: { [Op.in]: products } },
      include: [
        {
          model: MasterPackagingModel,
          attributes: ["packaging_desc", "packaging_id"],
          as: "variantPackaging",
        },
      ],
      raw: true,
      nest: true,
    });
    return responseData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA);
  }
};

export const findAllProducts = async ({ search = null, category = null }) => {
  try {
    console.log("search-----------", search);
    let where = { isDeleted: 0 };
    where = search
      ? { ...where, product_name: { [Op.like]: `%${search}%` } }
      : where;

    let categoryWhere = {};
    categoryWhere = category
      ? { ...where, category_id: category }
      : categoryWhere;

    const responseData = await MasterProductsModel.findAll({
      attributes: [
        "product_id",
        "product_name",
        "product_rating",
        "is_veg",
        "sub_category_id",
      ],
      where: where,
      include: [
        {
          model: MasterSubCategoryModel,
          attributes: ["sub_category_name", "category_id"],
          as: "productSubCategory",
          required: true,
          include: [
            {
              model: MasterCategoryModel,
              attributes: ["category_name"],
              as: "masterCategory",
              where: categoryWhere,
            },
          ],
        },
        {
          model: ProductVariantsModel,
          attributes: [
            "product_id",
            "product_variant_id",
            "packaging_id",
            "product_price",
            "discount_percent",
            "product_image",
          ],
          as: "productVariants",
          include: [
            {
              model: MasterPackagingModel,
              attributes: ["packaging_desc", "packaging_id"],
              as: "variantPackaging",
            },
          ],
        },
      ],
      order: [["product_rating", "DESC"]],
      raw: true,
      nest: true,
    });
    return responseData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA);
  }
};

export const findAllCategories = async () => {
  try {
    const responseData = await MasterCategoryModel.findAll({
      attributes: ["category_id", "category_name"],
      where: { isDeleted: 0 },
      raw: true,
    });

    return responseData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.CATEGORY_DATA);
  }
};
