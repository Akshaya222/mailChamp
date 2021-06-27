const nodemailer=require('nodemailer');
const { UserInstance } = require('twilio/lib/rest/chat/v1/service/user');

 function sendMail(to,subject,message,users){
    var transporter = nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'akshayareddy22111@gmail.com',
          pass: 'A21n02u00.'
        }
      });
      
      var mailOptions = {
        from: 'akshayareddy22111@gmail.com',
        //to: 'banalaaishwarya2002@gmail.com',
        to:to,
      //  subject: 'Sending Email using Node.js',
      cc:users,
      subject:subject,
       // text: 'That was easy!',
       //text:message
        html: message
      };
      
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //       return false
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //      return true
    //     }
    //   });
    return {
      transporter,mailOptions
    }
}
module.exports.sendMail=sendMail