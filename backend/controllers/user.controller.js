import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';



export const Register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.status(401).json({
                message: 'Something is missing, please check!',
                success: false
            })
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(401).json({
                message: 'Email already registered',
                success: false
            })
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashPassword,
        })
        return res.status(201).json({
            message: 'Account created successfully.',
            success: true
        })
    } catch (error) {
        console.log('error in register', error)
    }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).json({
                message: 'Something is missing, please check!',
                success: false
            })
        }
        let validUser = await User.findOne({email});
        if(!validUser) {
            return res.status(401).json({
                message: 'Incorrect email or password',
                success: false,
            })
        }
        const isPasswordMatch = await bcryptjs.compare(password, validUser.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                message: 'Something is missing, please check!',
                success: false
            })
        }

        const user = {
            _id: validUser._id,
            username: validUser.username,
            email: validUser.email,
            profilePicture: validUser.profilePicture,
            bio: validUser.bio,
            followers: validUser.followers,
            following: validUser.following,
            posts: validUser.posts
        }

        const token = await jwt.sign({userId: validUser._id}, process.env.SECRET_KEY, {expiresIn: '1d'});
        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1*24*60*60*1000
        }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        })
    } catch (error) {
        console.log('error in login', error)
    }
}

export const logout = async (_, res) => {
    try {
        return res.cookie('token', '', {maxAge: 0}).json({
            message: 'Logged out successfully',
            success: true
        })
    } catch (error) {
        console.log('error in logout', error)
    }
}


export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId)
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        
    }
}