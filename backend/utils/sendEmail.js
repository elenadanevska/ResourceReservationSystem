const nodemailer = require("nodemailer");
const { google } = require("googleapis");


exports.sendSupportEmail = async (req, res, next) => {
    const { name, email, subject, message } = req.body;
    const clientId = "629615735388-03l5qekt1ucjiahmetjq4mnvrvhikle4.apps.googleusercontent.com"
    const clientSecret = "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"
    const redirectUrl = "https://developers.google.com/oauthplayground"
    const refreshToken = "1//04Qpjdb5A0ef4CgYIARAAGAQSNwF-L9IriLRjWjXDxMbsTPg_iieErC4WdERXsbiV9lSITSaXfVVqqUy6nlJuQEnrAEKUNd_vkWY"
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

    const sendMessage = {
        from: name + "<elenadanevskatest0@gmail.com>",
        to: 'elenadanevska5@gmail.com',
        subject: subject,
        text: message,
        html: "<h1>Hello</h1>"
    };

    try {
        oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })
        const accessToken = await oAuth2Client.getAccessToken()

        let transporter = nodemailer.createTransport({
            service: gmail,
            auth: {
                type: "OAuth2",
                user: "elenadanevskatest0@gmail.com",
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken
            },
        });

        transporter.sendEmail(sendMessage, function (err, info) {
            console.log(process.env.CLIENT_ID);
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
