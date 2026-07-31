import { registerUserService, loginUserService, refreshAccessTokenService,logoutService,getCurrentUserService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password } = req.body;

    const createdUser = await registerUserService({ userName, fullName, email, password });

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await loginUserService({ email, password });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user, "access token": accessToken, "refresh token": refreshToken },
                "user LoggedIn successful"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    const { accessToken, refreshToken } = await refreshAccessTokenService(incomingRefreshToken);

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { "accesstoken": accessToken, "refreshtoken": refreshToken },
                "Access token refreshed successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    await logoutService(userId);

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        );
});

const getCurrentUser = asyncHandler ( async(req,res)=>{
    const userId = req.user?._id;
    const response = await getCurrentUserService(userId)

    return res.status(200)
                .json(
                    new ApiResponse(200,response,"Fetched current user Successfully")
                )
})

export { registerUser, loginUser, refreshAccessToken, logoutUser ,getCurrentUser};