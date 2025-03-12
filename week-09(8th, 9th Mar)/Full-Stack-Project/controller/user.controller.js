import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {

    //get data
    //validate
    //check if user already exists
    //create a user in db
    //create a verification token
    //save token in database
    //send token as email to user
    // send success to user

    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        };
        
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exist"
            });
        };
        
        const newUser =  await User.create(req.body);
        
        if(!newUser){
            return res.status(400).json({
                message: "User not registered"
            });
        }
    
        const token = crypto.randomBytes(32).toString("hex");
        newUser.verificationToken = token;
        await newUser.save();

        //send mail
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });
    
        const mailOption = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: newUser.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Please click on following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}
            `,
        }
        const info = await transporter.sendMail(mailOption);
    
        res.status(201),json({
            message:"User registered successfully",
            success:true
        });
    
    }catch(err){
        return res.status(400).json({
            message: "User not register",
            error:err,
            success:false
        });
    }
    

};

const verifyUser = async (req, res) => {
    //get token from user
    //validate token
    //find user based on token
    //if not
    //make isVerified field to true
    //remove verification Token
    //save and send sucess msg.

    try{
        const {userToken} = req.params;
        if(!userToken){
            return res.status(400).json({
                message: "Invalid token",
            });
        }

        const verifyingUser = await User.findOne({verificationToken: userToken});
        if(!verifyingUser){
            return res.status(400).json({
                message: "Invalid token",
            });
        }

        verifyingUser.isVerified = true;
        verifyingUser.verificationToken = null;
        await verifyingUser.save().status(200).json({
            message: "Verification successful"
        });

    }catch(err){
        return res.status(400).json({
            message: "Verification fail",
            err: err,
            success: false,
        });
    }
};

const login = async (req, res) => {

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required",
        });
    };

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        };

        //check if user is verify or not
        if(!user.isVerified){
            return res.status(400).json({
                message: "User is not verified. Please! verify first"
            });
        };
        
        const isMatch = await bcrypt.compare(password, user.password);


        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        };
        //Now you can logIn

        const token = jwt.sign({id: user._id, role: user.role}, "shhhhh", {
            expiresIn: "24h"
        })
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        }

        res.cookie("test", token, cookieOptions);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })

    } catch(err){
        return res.status(400).json({
            message: "Failed to LogIn",
            error: err,
            success:false
        });
    };
};
export {registerUser, verifyUser, login};