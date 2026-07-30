import { ApiError } from "../utils/ApiError.js";

 function validateRegister(req, res, next) {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
        return next(new ApiError(400, "All fields (userName, fullName, email, password) are required"));
    }

    const trimmedUsername = userName.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
        return next(new ApiError(400, "Username must be between 3 and 30 characters long"));
    }

    const trimmedFullName = fullName.trim();
    if (trimmedFullName.length < 3 || trimmedFullName.length > 30) {
        return next(new ApiError(400, "Full name must be between 3 and 30 characters long"));
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
        return next(new ApiError(400, "Invalid email address"));
    }

    if (password.length < 8) {
        return next(new ApiError(400, "Password length should be minimum 8 characters"));
    }

    next();
}

function validateLogin(req,res,next){
    const {email,password} = req.body;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
        return next(new ApiError(400, "Invalid email address"));
    }

    if (password.length < 8) {
        return next(new ApiError(400, "Password length should be minimum 8 characters"));
    }

    next();
}

export {validateRegister,validateLogin}