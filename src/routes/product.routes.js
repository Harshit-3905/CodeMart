import { Router } from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
