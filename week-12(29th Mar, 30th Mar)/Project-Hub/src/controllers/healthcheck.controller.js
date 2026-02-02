import { ApiResponse } from "../utils/api-response.js";

const healthCheck = async (req, res) => {
    try {
        return res.status(200).json(new ApiResponse(200, {message: "Server is running"}));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Health check failed"));
    }
};

export { healthCheck }; 
// json() → sends response
// return → stops function execution