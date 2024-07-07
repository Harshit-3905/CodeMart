import { Router } from "express";
import {
    createCategory,
    getAllCategories,
} from "../controllers/category.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.get("/", getAllCategories);
router.post("/", isAdmin, createCategory);

export default router;
