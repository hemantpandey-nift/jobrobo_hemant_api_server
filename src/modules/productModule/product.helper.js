import { MESSAGES } from "../../constants/index.js";
import {
  findAllCategories,
  findAllProducts,
  findCategoryTopProducts,
  findProductVariants,
} from "./product.services.js";

export const fetchCategoryTopProducts = async (category_id) => {
  try {
    const productsData = await findCategoryTopProducts(category_id);
    return productsData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA);
  }
};
export const fetchProductVariants = async (products) => {
  try {
    const productsData = await findProductVariants(products);
    return productsData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA);
  }
};

export const fetchAllProducts = async ({ search = null, category = null }) => {
  try {
    const productsData = await findAllProducts({ search, category });
    return productsData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA);
  }
};

export const fetchAllCategories = async () => {
  try {
    const categoryData = await findAllCategories();
    return categoryData;
  } catch (error) {
    console.log("error:", error);
    throw new Error(MESSAGES.ERROR.GLOBAL.CATEGORY_DATA);
  }
};
