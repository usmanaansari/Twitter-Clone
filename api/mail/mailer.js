const nodemailer = require('nodemailer');

async function sendMail(toUser, revpass){
    let transporter = nodemailer.createTransport({
        //name: 'localhost'
        host: 'localhost',
        port: 25,
        tls: {
            rejectUnauthorized: false
        }
    });
    
    var mailOptions = {
        from: '"Namsu Guy" <foo@example.com>',
        to: toUser,
        subject: 'Welcome to TTT',
        text: 'validation key: <'+revpass+'>'
    };
    console.log("Sending mail to... " + toUser);
    let info = await transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Message sent %s, info.messageId");        
        }
        transporter.close();
    });
}

module.exports = sendMail;