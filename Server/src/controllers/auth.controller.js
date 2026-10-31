import generateToken from "../lib/utils.js";
import { userModel } from "../Models/auth.models.js";
import bcrypt from 'bcrypt'

export const signupController = async (req,res)=>{
    try {
        const {fullName , email , password} = req.body
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All Fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message :"Password Must be 6 characters"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message : "Invalid Email"
            })
        }
        const isUserExist = await userModel.findOne({email})
        if(isUserExist){
            return res.status(400).json({
                message : "User Already Exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })
        if(newUser){
            generateToken(newUser._id , res )
            return res.status(201).json({
                message : "Signup Successfull",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message  : "Internal Server Error",
            error
        })
    }
}