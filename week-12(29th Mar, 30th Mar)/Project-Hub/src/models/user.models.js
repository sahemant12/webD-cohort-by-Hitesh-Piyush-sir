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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(this.password, password);
};

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

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry = Date.now() + 20*60*1000;
    return {unHashedToken, hashedToken, tokenExpiry};
}


export const User = mongoose.model("User", userSchema);

