var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    mailConfig = require("../../config.json").mail_config,
    log = require('../logger/logger').logger("mailer"),
    mailOptions;

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    auth: {
        user: mailConfig.uName,
        pass: mailConfig.pwd
    }
}));

/*var transporter  = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    user: mailConfig.uName,
    pass: mailConfig.pwd
}
});*/

exports.sendMail = function(to, cc, subject, body) {
    mailOptions = {
        from: mailConfig.from, // sender address
        to: to, // list of receivers
        cc: cc,
        subject: subject, // Subject line    
        html: body
    };

    // send mail with defined transport object based on flag
    if (mailConfig.enabled) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                log.error(error);
            }
        });
    }
};
