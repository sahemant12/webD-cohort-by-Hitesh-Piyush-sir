import jwt from "jsonwebtoken";
import "dotenv/config";

export const isLoggedIn = async (req, res, next) =>{
    try {
        //get token from cookies
        //validate token
        //get data from token
        console.log(req.cookies);
        const token = req.cookies?.token;
        console.log(token ? "YES":"NO");
        
        if(!token){
            console.log("TOKEN NOT FOUND");           
            return res.status(401).json({
                message:"authentication failed",
                success:false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded data: ", decoded);
        req.user = decoded; 

    } catch (error) {
        console.log("Auth middleware failure");      
        return res.status(401).json({
            message:"internal server error",
            success:false
        });
    }
    next();
}