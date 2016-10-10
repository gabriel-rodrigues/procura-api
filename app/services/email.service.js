var nodemailer = require('nodemailer'),
    config     = require('config');


function EmailService () {

}


EmailService.prototype.enviar = function (mailOptions) {


    var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: '', // entre as aspas simples, coloque seu email com dominio hotmail.
            pass: '' //entre as aspas simples, coloque a sua senha.
        },
        priority: 'high'
    });

    return transporter.sendMail(mailOptions);
};


module.exports = new EmailService();