import bcrypt from 'bcrypt'

export const passwordHash=async(password)=>{
    try {
        const hashedPassword=await bcrypt.hash(password,10)
        return hashedPassword
    } catch (error) {
        throw new Error(error.message)
    }
}

export const comparePassword=async(password,dbpassword)=>{
    try {
        let comparingPassword= await bcrypt.compare(password,dbpassword)
        return comparingPassword
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}