import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt)

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })

        await user.save()
        res.status(200).send("User has been Registered")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404, "User not found!"))
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrectPassword) return next(createError(400, "Wrong password"))

        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT)
        
        const {password, isAdmin, ...otherDetails} = user._doc

        res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails})
    } catch (error) {
        next(error)
    }
}