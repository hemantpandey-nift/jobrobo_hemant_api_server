import { MESSAGES } from "../../constants/index.js";
import {
  fetchAllCategories,
  fetchAllProducts,
  fetchCategoryTopProducts,
  fetchProductVariants,
} from "./product.helper.js";

export const getTopProducts = async (req, res) => {
  try {
    const allCategories = await fetchAllCategories();
    console.log("allCategories-----", allCategories);

    const productsMapperData = {};
    for (const category of allCategories) {
      const topProductsRes = await fetchCategoryTopProducts(
        category.category_id
      );

      const products = topProductsRes.map((el) => el.product_id);
      const productVariantsRes = await fetchProductVariants(products);

      for (const product of topProductsRes) {
        if (!productsMapperData[product.product_id]) {
          productsMapperData[product.product_id] = {};
          productsMapperData[product.product_id].product_id =
            product.product_id;
          productsMapperData[product.product_id].product_name =
            product.product_name;
          productsMapperData[product.product_id].product_rating =
            product.product_rating;
          productsMapperData[product.product_id].is_veg = product.is_veg;
          productsMapperData[product.product_id].sub_category_id =
            product.sub_category_id;
          productsMapperData[product.product_id].sub_category_name =
            product.productSubCategory.sub_category_name;
          productsMapperData[product.product_id].category_id =
            product.productSubCategory.category_id;
          productsMapperData[product.product_id].category_name =
            product.productSubCategory.masterCategory.category_name;
        }
      }

      for (const variant of productVariantsRes) {
        const productVariantData = {
          product_variant_id: variant.product_variant_id,
          product_id: variant.product_id,
          packaging_id: variant.packaging_id,
          product_price: variant.product_price,
          discount_percent: variant.discount_percent,
          product_image: variant.product_image,
          packaging_desc: variant.variantPackaging.packaging_desc,
        };
        if (!productsMapperData[variant.product_id].productVariants) {
          productsMapperData[variant.product_id].productVariants = [];
        }
        productsMapperData[variant.product_id].productVariants.push(
          productVariantData
        );
      }
    }

    const allProductsData = [];
    for (const key in productsMapperData) {
      allProductsData.push(productsMapperData[key]);
    }

    return res.status(200).json({
      status: true,
      message: MESSAGES.SUCCESS.GLOBAL.PRODUCTS_DATA,
      data: allProductsData,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({
      status: false,
      message: MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const search = req?.query?.search ? req?.query?.search.trim() : null;
    const category = req?.query?.category ?? null;
    const page = req.query.page ? req.query.page - 1 : 0;
    const limit = req?.query?.limit ?? 25;

    const allProductsRes = await fetchAllProducts({ search, category });

    const productsMapperData = {};
    for (const product of allProductsRes) {
      if (!productsMapperData[product.product_id]) {
        productsMapperData[product.product_id] = {};
        productsMapperData[product.product_id].product_id = product.product_id;
        productsMapperData[product.product_id].product_name =
          product.product_name;
        productsMapperData[product.product_id].product_rating =
          product.product_rating;
        productsMapperData[product.product_id].is_veg = product.is_veg;
        productsMapperData[product.product_id].sub_category_id =
          product.sub_category_id;
        productsMapperData[product.product_id].sub_category_name =
          product.productSubCategory.sub_category_name;
        productsMapperData[product.product_id].category_id =
          product.productSubCategory.category_id;
        productsMapperData[product.product_id].category_name =
          product.productSubCategory.masterCategory.category_name;
      }
      const productVariantData = {
        product_variant_id: product.productVariants.product_variant_id,
        packaging_id: product.productVariants.packaging_id,
        product_price: product.productVariants.product_price,
        discount_percent: product.productVariants.discount_percent,
        product_image: product.productVariants.product_image,
        packaging_desc: product.productVariants.variantPackaging.packaging_desc,
      };
      if (!productsMapperData[product.product_id].productVariants) {
        productsMapperData[product.product_id].productVariants = [];
      }
      productsMapperData[product.product_id].productVariants.push(
        productVariantData
      );
    }
    const allProductsData = [];
    for (const key in productsMapperData) {
      allProductsData.push(productsMapperData[key]);
    }

    return res.status(200).json({
      status: true,
      message: MESSAGES.SUCCESS.GLOBAL.PRODUCTS_DATA,
      data: allProductsData,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({
      status: false,
      message: MESSAGES.ERROR.GLOBAL.PRODUCTS_DATA,
    });
  }
};
