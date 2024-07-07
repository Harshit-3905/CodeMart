import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.AuthToken;
        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }
        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.id).select("-password");
        if (!user) {
            throw new ApiError(401, "Invalid Auth Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Auth Token");
    }
});
