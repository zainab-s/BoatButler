const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');// for sending mails
var path = require('path');

function apiRouter(){

  const router = express.Router();

  router.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
    console.log('Get success');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  });

  router.post('/contact',(req, res) => {
    console.log(req.body.value[0]);

    res.setHeader('Access-Control-Allow-Origin', '*'); // Change this to your Angular 2 port number
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
      //outout data for the email
    const output = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Making Accessible Emails</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            /* CLIENT-SPECIFIC STYLES */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }

            /* RESET STYLES */
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        </style>
      </head>
      <body style="background-color: #1b2a49; margin: 0 !important; padding: 60px 0 60px 0 !important;">
        <table border="0" cellspacing="0" cellpadding="0" role="presentation" width="100%">
          <tr>
              <td bgcolor="#1b2a49" style="font-size: 0;">&​nbsp;</td>
              <td bgcolor="white" width="600" style="border-radius: 4px; color: grey; font-family: sans-serif; font-size: 18px; line-height: 28px; padding: 40px 40px;">
                <h1 style="color: black; font-size: 32px; font-weight: bold; line-height: 36px; margin: 0 0 30px 0;">You have a new contact request!</h1>
                <p style="margin: 0 0 30px 0;"> <em style="color: black;">Contact Details</em> </p>
                <p style="margin: 0 0 30px 0;"><em style="color: black;">Name:</em> ${req.body.value[0].name}</p>
                <p style="margin: 0 0 30px 0;"><em style="color: black;">Email:</em> ${req.body.value[0].email}</p>
                    <p style="margin: 0 0 30px 0;"> <em style="color: black;">Message</em> </p>
                <p style="margin: 0 0 30px 0;"> ${req.body.value[0].message} </p>
              </td>
              <td bgcolor="#1b2a49" style="font-size: 0;">&​nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ,// SMTP host from my personal domain
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS // generated ethereal password
      }
    });


    // setup email data with unicode symbols
    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: process.env.MAIL_TO, // list of receivers
      subject: 'Message from BoatButlerLand', // Subject line
      text: 'nodemailer Mail', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    return res.status(201).json('success')
  });

  return router;
};

module.exports = apiRouter;
