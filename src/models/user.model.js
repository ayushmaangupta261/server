import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNo: {
            type: Number,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        profileImg: {
            type: String, // cloudinary url
        },
        password: {
            type: String,
        },
        refreshToken: {
            type: String
        }
    },

    {
        timestamps: true
    }
);


// to hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
});



// to check password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // true or false
}



// tokens
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { // payload
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        // secret
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { // payload
            _id: this._id,
        },
        // secret
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);