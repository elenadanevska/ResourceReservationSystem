const nodemailer = require("nodemailer");


exports.sendSupportEmail = async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    const sendMessage = {
        from: name,
        email: email,
        subject: subject,
        text: message
    };

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    try {
        transporter.sendEmail(sendMessage, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        })
        res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
        next(error);
    }
};
