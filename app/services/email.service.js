var nodemailer = require('nodemailer'),
    config     = require('config');


function EmailService () {

}


EmailService.prototype.enviar = function (mailOptions) {


    var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'gabrielll.bsb@hotmail.com',
            pass: '81819083'
        },
        priority: 'high'
    });

    return transporter.sendMail(mailOptions);
};


module.exports = new EmailService();