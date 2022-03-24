const { check, validationResult } = require('express-validator');


exports.checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(400).json({ error: error })
    }
    next();
}

exports.userValidator = [
    check("name")
        .trim()
        .not().isEmpty().withMessage("First name can not be empty")
        .isLength({ max: 20 }).withMessage("First name can not have more then 20 charasters"),
    check("surname")
        .trim()
        .not().isEmpty().withMessage("Surname can not be empty")
        .isLength({ max: 25 }).withMessage("First name can not have more then 25 charasters"),
    check("email")
        .trim()
        .not().isEmpty().withMessage("Email can not be empty")
        .isEmail().withMessage("Please enter a valid email"),
    check("password")
        .trim()
        .not().isEmpty().withMessage("Password can not be empty")
        .isLength({ min: 7 }).withMessage("Password must be at least 7 characters long"),
];