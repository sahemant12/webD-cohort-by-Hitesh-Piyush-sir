
class ApiResponse{
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode;
        this.data = data; // Actual response payload
        this.message = message; // Human-readable message
        this.success = statusCode < 400;
    };
}

export { ApiResponse };

// 1. This class does NOT send the response by itself.
// 2. It formats the response. Express still sends it using res.status().json().

// ❌ Without ApiResponse
// res.status(200).json({
//   success: true,
//   message: "User fetched",
//   data: user
// }); // type all these again and again for every response.

// ✅ With ApiResponse
// res.status(200).json(new ApiResponse(200, user, "User fetched"));

// Now every API response looks like:
// {
//   "statusCode": 200,
//   "data": { ... },
//   "message": "User fetched",
//   "success": true
// }


