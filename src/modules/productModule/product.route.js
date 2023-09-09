import { Router } from "express";
import * as productController from "./product.controller.js";
import * as productsSchema from "./product.schema.js";

const productRoute = Router();

productRoute.get("/top-products", (req, res) => {
  productController.getTopProducts(req, res);
});

productRoute.get(
  "/all-products",
  productsSchema.getProductsSchema,
  (req, res) => {
    productController.getAllProducts(req, res);
  }
);

export default productRoute;
