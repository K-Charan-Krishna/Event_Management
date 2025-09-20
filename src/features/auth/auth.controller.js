import { response } from "../../utilis/response.js"
import { generateLinkService, registerUserService, userLoginService ,updateUserPasswordService} from "./auth.services.js"
import { passwordHash } from "../../utilis/passwordhashing.js"
import jwt from 'jsonwebtoken'
import { sendEmailResetPasswordLink } from "../../utilis/mailer.js"


export const registerUser = async (req, res) => {
    try {
        console.log('Reg Hit')
        if (!req.body || typeof req.body !== 'object') {
            return response(res, 400, false, 'Request body is missing or invalid!');
        }
        let { firstName, lastName, email, password, avatar } = req.body
        if (!firstName || !lastName) {
            return response(res, 400, false, 'User firstName and lastName Required!')
        }
        if (!email) {
            return response(res, 400, false, 'Email Name Required!')
        }
        if (!password) {
            return response(res, 400, false, 'Password Name Required!')
        }
        let hashedPassword = await passwordHash(password)
        let payLoad = {
            firstName,
            lastName,
            email,
            hashedPassword,
            avatar
        }
        let addUser = await registerUserService(payLoad)
        return response(res, 201, true, addUser, [])
    } catch (error) {
        return response(res, 500, false, error.message, [])
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return response(res, 400, false, 'Email is  Required!')
        }
        if (!password) {
            return response(res, 400, false, 'Password is Required!')
        }
        let userDetails = await userLoginService(email, password)
        req.userDetails = userDetails
        next()
    } catch (error) {

        return response(res, 500, false, error.message, [])
    }
}

export const generateLink = async (req, res, next) => {
    try {
        let jwtKey=process.env.JWT_KEY
        if (!req.body || typeof req.body !== 'object') {
            return response(res, 400, false, 'Request body is missing or invalid!');
        }
        const { email } = req.body
        if (!email) {
            return response(res, 400, false, 'Email is  Required!')
        }
        let userId = await generateLinkService(email)
        // create token with userid with 10mins validatin
        let token = jwt.sign({
            userId,
        }, jwtKey, {
            expiresIn: '10m'
        })
        // take frontend url from env+ token
        console.log(token)
        let link=`${process.env.LOCAL_FORNTEND_URL}resetPassword?token=${token}`

        // send email
        let mailResponce= await sendEmailResetPasswordLink(email,link)
        return response(res,200,true,mailResponce,[])

    } catch (error) {
        console.log(error)
        return response(res, 500, false, error.message, [])
    }
}

export const verifiyResetPassword= async(req,res)=>{
    try {
        console.log('API Hit')
        const {newPassword}=req.body
        const userId=req.userId
        let respnce_from_db=await updateUserPasswordService(userId,newPassword)
        return response(res, 200, true, respnce_from_db, [])
    } catch (error) {
        return response(res, 500, false, error.message, [])
    }
}

export const summ=(a,b)=>{
    return a+b
}

export const inputValidate=(input)=>{
    if (typeof input !=='number'){
        throw new Error ('Input Should be Number!')
    }
}

export const callbackfunction=(callback)=>{
    setTimeout(()=>{
        callback('from callback')
    },1000)
}

export const verifyInput=async(req,res)=>{
    try {
        return res.send('200')
    } catch (error) {
        return res.send(error)
    }
}

export const checkingPromiss=(data)=>{
    return new Promise((reslove,reject)=>{
        if(data==='hi'){
            reslove(data)
        }
        else{
            reject(new Error('error'))
        }
    })
}