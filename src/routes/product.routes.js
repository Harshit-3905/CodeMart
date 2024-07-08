import { Router } from "express";
import {
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", verifyJWT, getProduct);
router.delete("/:id", verifyJWT, deleteProduct);
router.post("/", verifyJWT, upload.single("image"), addProduct);
router.put("/:id", verifyJWT, updateProduct);

export default router;
