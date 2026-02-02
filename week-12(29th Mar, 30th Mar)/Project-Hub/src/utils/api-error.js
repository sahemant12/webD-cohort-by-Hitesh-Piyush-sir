
class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message); // call parent "Error" constructor with the message // If you extend a class, you MUST call super() first. 
        this.statusCode = statusCode; // error status code
        this.message = message; // user-friendly message
        this.success = false; 
        this.errors = errors; // detailed validation errors (optional)

        if(stack){ // If stack trace is manually provided, use it
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor); // Auto-generate stack trace
            // What this does:
            // Captures where the error happened
            // Excludes constructor noise
            // Cleaner stack trace for debugging
        }
    }
}
// E.g: throw new ApiError(404, "User not found", ["Invalid user ID"]);
export {ApiError};

// ❌ Without ApiError
// throw new Error("User not found");
// problems: No status code, No consistency, Hard to handle centrally

// ✅ With ApiError
// throw new ApiError(404, "User not found");
// get: Status code, Clean message, Structured response, Centralized error handling