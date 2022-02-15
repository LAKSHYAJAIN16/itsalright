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

  //Create Mail Options
  const mailOptions = {
    from: "noreply.itsalright@gmail.com",
    to: email,
    subject: "Security Alert : Someone logged into your account",
    html: `
       On, ${new Date(Date.now()).toDateString()}at ${new Date(Date.now()).toLocaleTimeString()}, someone logged into your account
       If that was you, ignore this email. If it wasn't, report it to us immidiately
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
