import { Router } from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// router.route("/info").get((req,res)=>{
//     res.status(200).json({
//         success : true,
//         message : "Auth info api hit "
//     })
// })

router.route("/register").post(validateRegister, registerUser);
router.route("/login").post(validateLogin, loginUser);

router.route("/verifyJWT").post(verifyJWT, (req, res) => {
    res.status(200).json({
        success: true,
        message: "jwt token is verified",
    });
});

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

export default router;

