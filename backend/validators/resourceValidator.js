const { check, validationResult } = require('express-validator');

exports.checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(400).json({ error: error })
    }
    next();
}

exports.resourceValidator = [
    check("name")
        .trim()
        .not().isEmpty().withMessage("Resource name can not be empty")
        .isLength({ max: 20 }).withMessage("Resource name can not have more then 20 charasters"),
    check("describtion")
        .trim()
        .isLength({ max: 150 }).withMessage("The description can not have more then 150 charasters"),
    check("note")
        .trim()
        .isLength({ max: 80 }).withMessage("The note can not have more then 80 charasters"),
];