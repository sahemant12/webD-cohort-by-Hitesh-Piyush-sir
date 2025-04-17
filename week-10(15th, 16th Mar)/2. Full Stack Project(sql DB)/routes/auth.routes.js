import express from "express";
import {registerUser} from "../controller/auth.controller.js";

const userRouter = express.Router();

userRouter
        .get("/register", registerUser);

export default userRouter;