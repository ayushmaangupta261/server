import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



// register user
const registerUser = async (req, res) => {

    try {

        const { firstName, lastName, phoneNo, email, password } = req.body;
        // console.log("Req body in register user -> ", req.body);


        // check the name of the user
        if (!firstName || !lastName) {
            throw new ApiError(400, "Please enter name correctly")
        }

        // check for the phone number and email address
        if (!phoneNo && !email) {
            throw new ApiError(400, "Please need one of any phoneNo or email ")
        }

        // check for the password
        if (!password) {
            throw new ApiError(400, "Please provide a password")
        }


        // find if the user exists already
        const existingUser = await User.findOne({
            $or: [{ phoneNo }, { email }]
        });

        // console.log("Existing user -> ", existingUser);

        // If user exists already suggest for login
        if (existingUser) {
            throw new ApiError(409, "The user already exists.. please go and login")
        }


        // check files in the req
        const files = req?.files;
        // console.log("Files in the register in the register user -> ", files)

        if (!files) {
            throw new ApiError(400, "Please provide the images");
        }

        const pathOfImg = files?.profileImg[0]?.path;
        // console.log("Path of the image file -> ", pathOfImg);

        if (!pathOfImg) {
            throw new ApiError(400, "Error in path of the image");
        }



        // upload the image to cloudinary
        const uploadedImg = await uploadOnCloudinary(pathOfImg);
        // console.log("Response from cloudinary -> ", uploadedImg);

        if (!uploadedImg) {
            throw new ApiError("Error in uploading image to cloudinary");
        }


        // register the user
        const registeredUser = await User.create({
            firstName,
            lastName,
            profileImg: uploadedImg?.secure_url || " ",
            phoneNo: phoneNo || "",
            email: email || "",
            password
        })

        console.log("Registered user -> ", registeredUser);

        if (!registeredUser) {
            throw new ApiError(400, "Error in registering the user")
        }

        const { password: _, createdAt, updatedAt, ...userData } = registeredUser._doc;

        // console.log("User Data -> ",userData);

        return res.status(201).json(
            new ApiResponse(200, userData, "User Registered Successfully")
        )


    } catch (error) {
        console.log("Error in register user -> ", error);

        const statusCode = error.statuscode || 500; // Use the status code from ApiError or default to 500
        const message = error instanceof ApiError ? error.message : "Internal Server Error"; // Get the error message

        return res.status(statusCode).json({
            statuscode: statusCode,
            data: null,
            success: false,
            message: message, // Include the message in the response
            errors: error.errors || [], // Include specific errors if any
        });

    }


}








export {
    registerUser
}
