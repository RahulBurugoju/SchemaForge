import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = req.cookies?.accessToken || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader);

    if (!token) {
        throw new ApiError(401, "Unauthorized Request: No token provided");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        if (error?.name === "TokenExpiredError") {
            throw new ApiError(401, "Token Expired");
        }
        throw new ApiError(401, "Invalid access token");
    }

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User Not Found");
    }

    req.user = user;
    next();
});

export { verifyJWT }