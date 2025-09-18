import express from "express";
import { registerUser,login, generateLink } from "./auth.controller.js";
import { createToken } from "../../utilis/tokenservice.js";

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',login,createToken)
router.post('/send-reset-password-link',generateLink)

export default router