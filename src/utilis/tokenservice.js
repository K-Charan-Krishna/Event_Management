import jwt from 'jsonwebtoken'
import { response } from './response.js'

export const createToken= async(req,res)=>{
    try {
        let jwtKey=process.env.JWT_KEY
        console.log(jwtKey,'mmm')
        let {id,firstName,lastName,email,role}=req.userDetails
    let token=  jwt.sign({
        id,
        role
    },jwtKey,{
        expiresIn:'1h'
    })
    let data={
        token,
        firstName,
        lastName,
        email
    }
    return response(res,200,true,'Login Successfully',data)
    } catch (error) {
        console.log(error)
        return response(res,500,false,error.message)
    }
    
}