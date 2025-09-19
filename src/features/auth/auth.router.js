import express from "express";
import { registerUser,login, generateLink,verifiyResetPassword } from "./auth.controller.js";
import { createToken, verifyRestPassToken } from "../../utilis/tokenservice.js";

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',login,createToken)
router.post('/send-reset-password-link',generateLink)
router.post('/verify-resetpassword',verifyRestPassToken,verifiyResetPassword)

export default router