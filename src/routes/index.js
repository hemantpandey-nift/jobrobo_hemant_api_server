import { Router } from "express";

import authRoute from "../modules/authModule/auth.route.js";
import productRoute from "../modules/productModule/product.route.js";

const router = Router();

router.use("/product", productRoute);
router.use("/auth", authRoute);

export default router;
