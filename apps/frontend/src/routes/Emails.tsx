import nodemailer from "nodemailer";

function SendingEmails () {

// Create transport for sending emails (replace with your email service's data)
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: 'bringhamhospital@gmail.com', // Your email address
      pass: 'CS3733D24SoftEng!', // Your password
    },
  });

// Set email options
  const mailOptions = {
    from: 'bringhamhospital@gmail.com', // Sender
    to: 'kajaiaelene@gmail.com', // Recipient
    subject: 'Hello??', // Email subject
    html: "<h> welcome </h>", // Email HTML content
  };

// Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return <h1> DONE </h1>;
}

export default SendingEmails;
