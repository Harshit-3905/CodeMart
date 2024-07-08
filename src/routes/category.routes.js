import { Router } from "express";
import {
    createCategory,
    getAllCategories,
} from "../controllers/category.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllCategories);
router.post("/", verifyJWT, isAdmin, createCategory);

export default router;
