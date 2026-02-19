
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err)) // call Global error middleware
    }
}

export {asyncHandler};
// This code helps us to not use try catch every where.

// VISUAL FLOW:
// Client request
//     ↓
// Express route
//     ↓
// asyncHandler
//     ↓
// controller
//     ↓
// Error occurs?
//     ↓ yes
// Promise rejected
//     ↓
// .catch()
//     ↓
// next(err)
//     ↓
// Global error middleware
//     ↓
// Response sent
