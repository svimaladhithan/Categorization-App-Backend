import User from "../Models/userModel.js";
import { errorHandler } from "../Utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import crypto from 'crypto';


dotenv.config();

const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${code}`,
    };
  
    await transporter.sendMail(mailOptions);
  };

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All the Fields Are Required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const verificationCode = crypto.randomInt(10000000, 99999999).toString();

  const newUser = new User({ username, email, password: hashedPassword, verificationCode });
  try {
    await newUser.save();
    await sendVerificationEmail(email, verificationCode);
    res
      .status(200)
      .json({ message: "User Registered Successfully. Please check your email for the verification code.", result: newUser });
  } catch (error) { 
    next(error);
  }
}; 

export const verifyCode = async (req, res, next) => {
    const { email, code } = req.body;
    if (!email || !code) {
      return next(errorHandler(400, "Email and verification code are required"));
    }
  
    try {
      const userDetail = await User.findOne({ email });
      if (!userDetail) {
        return next(errorHandler(400, "User not found"));
      }
      if (userDetail.verificationCode !== code) {
        return next(errorHandler(400, "Invalid verification code"));
      }
      
      // Optionally, you can update the user to mark them as verified
      userDetail.isVerified = true; // Add this field to your User model
      userDetail.verificationCode = null; // Clear the code
      await userDetail.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  };
  
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All the Fields Are Required"));
  }
  try {
    const userDetail = await User.findOne({ email });
    const userPassword = bcryptjs.compareSync(password, userDetail.password);
    if (!userDetail || !userPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const token = jwt.sign(
      { id: userDetail._id, isAdmin: userDetail.isAdmin },
      process.env.JWT_SECRET_KEY
    );
    
    const { password: passkey, ...rest } = userDetail._doc;

    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", rest, token });
  } catch (error) {
    next(error);
  }
};