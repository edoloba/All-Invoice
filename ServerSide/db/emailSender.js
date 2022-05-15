const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST_PORT,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  const registerMailSender = (name, receiver, key) => {
    return new Promise((resolve, reject) => {
      const link = `http://localhost:${process.env.PORT || 3010}/register/verify?id=${key}`;
      const mailOption = {
        from: process.env.APP_EMAIL,
        to: receiver,
        subject: "Registration Confirmation Mail",
        html: `
            <h1>Hello: ${name}</h1>
              <h2>Click on the link below to finish your registration</h2>
              <p> <a href="${link}"> Click here to verify</a> </p>
              `,
      };
      transporter.sendMail(mailOption, (err, info) => {
        console.log(info);
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }

  const messageEmail = (name, mail, msg) => {
    return new Promise((resolve, reject) => {
      const mailOption = {
        from: process.env.APP_EMAIL,
        to: process.env.APP_EMAIL, // You can change it to your email address if you want
        subject: "A new Message from your Website",
        html: `
            <h1>Sender: ${name}</h1>
            <h2>Email: ${mail}
              <p> ${msg} </p>
              `,
      };
      transporter.sendMail(mailOption, (err, info) => {
        console.log(info);
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }

module.exports = {registerMailSender, messageEmail};
