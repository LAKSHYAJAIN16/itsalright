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
  //Create Mail Options
  const mailOptions = {
    from: "noreply.itsalright@gmail.com",
    to: "noreply.itsalright@gmail.com",
    subject: "yuo have a message lol",
    html: req.query.m
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(200).json(error);
    } else {
      res.status(200).json(info.response);
    }
  });
}
