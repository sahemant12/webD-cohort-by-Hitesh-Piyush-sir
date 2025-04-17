
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";


const prisma = new PrismaClient();


export const registerUser = async(req, res) => { 

    const {name, email, password} = req.body;
    if(!name || !email || !password){
        console.log("Data is Missing");
        res.status(400).json({
            success: false,
            message: "All fields are required",
        });
        
        try {
            const existingUser = await prisma.user.findUnique({ //user is table that we have created.
                where: {email}
            });
    
            if(existingUser){
                res.status(400).json({
                    success: false,
                    message: "User already exists",
                });
            }            
            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const verificationToken = crypto.randomBytes(32).toString("hex");

            const newUser = await prisma.user.create({
                name,
                email,
                password: hashedPassword,
                verificationToken
            });

            //send mail


        } catch (err) {
            res.status(400).json({
                message: "registration failed",
                error:err,
                success:false
            });
        }


    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required",
        })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })
    
        if(!user){
            return res.status(400).json({
                message: "user not exist",
            })
        }
    
        const isVerified = bcrypt.compare(password, user.password);
    
        if(!isVerified){
            return res.status(400).json({
                message: "invalid email or password",
            })
        }
    
        //login successful. Now send jwt token to user in cookies.
    
        const jwtToken = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        const cookieOptions = {
            httpOnly:true,
        }
        res.cookie("token", jwtToken, cookieOptions );

        return res.status(201).json({
            success:true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });
    
    } catch (error) {
        return res.status(400).json({
            message: "Login fail",
        })
    }
}