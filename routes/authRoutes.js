import express from "express";
import { login, register, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import rateLimiter from 'express-rate-limit'
const router = express.Router();
const apiLimiter = rateLimiter({
    windowMs:15*60*1000,
    max:10,
    message:'Too many request from this IP, please try again after 15 minutes'
})
router.route('/register').post(apiLimiter,register);
router.route('/login').post(apiLimiter,login);
router.route('/updateUser').patch(authenticateUser,updateUser);

export default router;