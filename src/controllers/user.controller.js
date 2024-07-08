import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body;
    if (
        [fullname, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Missing Required Fields");
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (existedUser) {
        throw new ApiError(409, "Email or Username already exists");
    }
    const createdUser = await User.create({
        username,
        email,
        fullname,
        password,
    });

    res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Missing Required Fields");
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid Email or Password");
    }
    const token = await user.generateAuthToken();
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("AuthToken", token, options)
        .json(
            new ApiResponse(
                200,
                { user, AuthToken: token },
                "User logged in successfully"
            )
        );
});

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("AuthToken").json(
        new ApiResponse(200, null, "User logged out successfully")
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(new ApiResponse(200, req.user, "User fetched successfully"));
});
