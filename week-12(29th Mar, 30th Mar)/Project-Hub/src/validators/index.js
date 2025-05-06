import {body} from "express-validator";

const userRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("username is required")
            .isLength({min: 3}).withMessage("username should be atleast 3 character")
            .isLength({max: 13}).withMessage("username should not exceed 13 character"),
        body("password")
            .isLength({min: 6}).withMessage("password should atleast 6 character"),
    ];
};

const userLoginValidator = () => {
    return [
        body("email")
            .isEmail().withMessage("Email is not valid"),
        body("password")
            .isEmpty().withMessage("password cannot be empty")
    ];
}

export {userRegistrationValidator, userLoginValidator};