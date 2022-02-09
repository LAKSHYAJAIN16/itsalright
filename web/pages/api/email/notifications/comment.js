import nodemailer from "nodemailer";

//Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.itsalright@gmail.com",
    pass: "Jimin@123",
  },
});

export default function handler(req, res) {
  //Get User Info
  const email = req.query.m;
  const name = req.query.n;
  const message = req.query.msg;

  //Create Mail Options
  const mailOptions = {
    from: "noreply.itsalright@gmail.com",
    to: email,
    subject: `${name} commented on your Post at ${new Date(
      Date.now()
    ).toLocaleTimeString()}`,
    html: `
       <h1>Comment from ${name}</h1>
       <h2>${name} : ${message}</h2>
       <br>
       <br>
       Please hop onto Itsalright and respond to ${name}!
       <br>
       <br>
       <small>If you want to unsubscribe from these notifications you can go to your <a href="itsalright.vercel.app">user settings</a></small>
       <br>
       <small>PS : This was sent by a "no-reply" email account. Please do not reply to this email</small>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(200).json(error);
    } else {
      res.status(200).json(info.response);
    }
  });
}
