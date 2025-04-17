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
    //send success to user

        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        };

    try{
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
        console.log("User save");
        
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
        await transporter.sendMail(mailOption);
    
        res.status(201),json({
            message:"User registered successfully",
            success:true
        });
    
    }
    catch(err){
        return res.status(400).json({
            message: "User not register..",
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

        const isPsswordMatch = await bcrypt.compare(password, user.password);


        if(!isPsswordMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        };
        //Now you can logIn

        const token = jwt.sign({id: user._id, role: user.role, isVerified: user.isVerified}, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        console.log(token);        
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        }

        res.cookie("token", token, cookieOptions);
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

const getMe = async (req, res) => {
    try {
        const data = req.user;
        console.log("reached at profile level: ", data);
        const user = await User.findById(data.id).select("-password");     
        console.log(user);
        
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success:false,

            });
        }
        res.status(200).json({
            success:true,
            user
        });

    } catch (error) {
        console.log(error);      
    }
}

const logoutUser = async (req, res) => { //clear the cookies
    try {
        res.cookie("token", "", {
            expires: new Date(0) //give the initial date. i.e 1970
        })
        res.status(200).json({
            success:true,
            message: "Logged out successfully"
        });       

    } catch (error) {
        console.log(error);
        {
        error: error
        }
    }
}

const forgotPassword = async (req, res) => {
    try {
        //get email
        //find user based on email
        // reset token + reset expiry => Date.now() + 10 * 60 * 1000
        //save user
        //send email => design url
        
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                message: "Provide email to reset password"
            });
        };

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        };


        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 10*60*1000;
        await user.save();


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
            to: user.email, // list of receivers
            subject: "Reset your password", // Subject line
            text: `Please click on following link: ${process.env.BASE_URL}/api/v1/users/forgotPassword/${token}
            `,
        }
        await transporter.sendMail(mailOption);
    
        res.status(201).json({
            message:"resetting password ",
            success:true
        });

    } catch (error) {
        console.log(error);
        {
        error: error
        }
    }
}

const resetPassword = async (req, res) => {

        //collect token from params
        //password from req.body
        //find user based on token
        //set password in user
        //reset resetToken, resetField => empty
        //save
        const {token} = req.params;
        const {password} = req.body;

        if(!token || !password){
            return res.status(400).json({
                message: "Invalid token or password",
            });
        }

    try {
        const resetPasswordUser = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now()}
        });

        if(!resetPasswordUser){
            return res.status(400).json({
                message: "Invalid token or time expires",
            });
        }

        resetPasswordUser.password = password;
        resetPasswordUser.resetPasswordToken = "";
        resetPasswordUser.resetPasswordExpires = null;
        await resetPasswordUser.save();

        res.status(200).json({
            message: "Reset Password successful",
        })

    } catch (error) {
        console.log(error);       
    }
}

export {registerUser, verifyUser, login, getMe, logoutUser, forgotPassword, resetPassword};

