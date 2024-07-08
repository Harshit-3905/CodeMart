import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addProduct = asyncHandler(async (req, res) => {
    const { title, image, price, details, category } = req.body;
    if (
        [title, image, price, details, category].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Missing Required Fields");
    }
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "Image is required");
    }
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    const createdProduct = await Product.create({
        title,
        image: uploadedImage.url,
        price,
        details,
        category,
    });

    res.status(201).json(
        new ApiResponse(200, createdProduct, "Product added successfully")
    );
});

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate("category");
    res.status(200).json(new ApiResponse(200, products));
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, image, details, category } = req.body;
    if (
        [title, image, details, category].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Missing Required Fields");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { title, image, details, category },
        { new: true }
    );

    res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
    );
});

export const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    res.status(200).json(new ApiResponse(200, product));
});
