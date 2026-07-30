import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String, //cloudinary url   
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    const payload = {
        _id: this._id,
        userName: this.userName,
        email: this.email,
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

    const accessToken = jwt.sign(payload, secret, options);

    return accessToken
}

userSchema.methods.generateRefreshToken = async function () {
    const payload = {
        _id: this._id,
    }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }

    const refreshToken = jwt.sign(payload, secret, options);

    return refreshToken;
}

export const User = mongoose.model("User", userSchema)
