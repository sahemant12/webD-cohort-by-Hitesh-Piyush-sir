import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localpath: String,
        },
        default: {
            url: `https://placehold.co/600x400`,
            localpath: ""
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationExpiry: {
        type: Date,
    }

}, {timestamps: true});

// hash the password
userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// checking password before Login
userSchema.methods.isPasswordCorrect = async function(password){ // defining my Method. Mongoose give this functionality too.
    return await bcrypt.compare(password, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

// generate temporary token(use for email verification)
userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex"); // syntax
    const tokenExpiry = Date.now() + 20*60*1000;
    return {unHashedToken, hashedToken, tokenExpiry};
}
// just fun stuff. keep hashedtoken in DB but send unHashed token to user.

export const User = mongoose.model("User", userSchema);

// Flow of access & refresh token

// Access token:
// An access token is a short-lived token used to authenticate a user and access protected resources.

// Refresh token:
// A refresh token is a long-lived token used to generate a new access token when the old one expires.

// Flow:
// 1. User login.
// 2. Server creates access and refresh token and send to client. Refresh token is often stored in DB.
// 3. Access token expires → Client sends refresh token → server verifies refresh token → Server issues New access token and send to client.
// 4. User continue sending APIs without logout.