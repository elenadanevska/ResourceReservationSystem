const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");


exports.sendSupportEmail = async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ sucess: false, error: "User with this email does not exist" });
        }

        try {
            sendEmail({
                from: name,
                to: user.email,
                subject: subject,
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        next(err);
    }
};