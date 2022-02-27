const { check, validationResult } = require('express-validator');

exports.checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(400).json({ error: error })
    }
    next();
}

exports.reservationeValidator = [
    check("date")
        .trim()
        .not().isEmpty().withMessage("Field date is reqired")
        .isDate().withMessage("The date you entered is not valid"),
    check("time")
        .trim()
        .not().isEmpty().withMessage("Field time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/).withMessage("The reservation time must have a format HH:MM-HH:MM"),
];