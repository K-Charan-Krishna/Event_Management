import User from "../../schemas/user.schema.js"
import { comparePassword } from "../../utilis/passwordhashing.js"

export const registerUserService = async (payload) => {
    try {
        let newUser = new User(payload)
        let result = await newUser.save()
        return 'User Created Successfully!'
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            console.error(`Duplicate ${field}: ${error.keyValue[field]}`);

            throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`)
        }
        throw new Error(error.message)
    }

}

export const userLoginService = async (email, password) => {
    try {
        let user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            throw new Error('Invalid Email or Password')
        }
        let isPasswordEqual = await comparePassword(password, user.hashedPassword)
        if (!isPasswordEqual) {
            throw new Error('Invalid Email or Password')
        }
        let userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
        return userData

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const generateLinkService = async (email) => {
    try {
        let user = await User.findOne({ email })
        if (!user) {
            throw new Error('User Not Exists')
        }
        return user._id
    } catch (error) {
        throw new Error(error.message)
    }
}

