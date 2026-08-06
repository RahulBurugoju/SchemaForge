import { Router } from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser, getCurrentUser, updateUserProfile } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(validateRegister, registerUser);
router.route("/login").post(validateLogin, loginUser);

router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/profile").patch(verifyJWT, updateUserProfile);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;

