import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {isValidObjectId} from 'mongoose'


async function generateAccessAndRefreshTokens(userId) {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
}

const registerUserService = async ({ userName, fullName, email, password }) => {
    const existedUser = await User.findOne({
        $or: [{ email }, { userName }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({
        userName,
        fullName,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return createdUser;
};

const loginUserService = async ({ email, password }) => {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new ApiError(404, "User Not Found : please register");
    }

    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id);

    const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken");

    return {
        user: loggedInUser,
        accessToken,
        refreshToken
    };
};

const refreshAccessTokenService = async (incomingRefreshToken) => {
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request: Refresh token is required");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};

const logoutService = async (userId) => {
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid User ID");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, "User Not Found");
    }

    return true;
};

export {
    generateAccessAndRefreshTokens,
    registerUserService,
    loginUserService,
    refreshAccessTokenService,
    logoutService
};


