import express from 'express';
import { registerUser, verifyCode, loginUser } from '../Controllers/authController.js';


const router = express.Router();

router.post("/register-user",registerUser)
router.post("/verify", verifyCode);
router.post("/login-user",loginUser)

export default router; 
