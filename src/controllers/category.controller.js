import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if ([name].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Missing Required Fields");
    }
    const existedCategory = await Category.findOne({ name });
    if (existedCategory) {
        throw new ApiError(409, "Category already exists");
    }
    const createdCategory = await Category.create({ name });

    res.status(201).json(
        new ApiResponse(200, createdCategory, "Category created successfully")
    );
});

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(new ApiResponse(200, categories));
});
