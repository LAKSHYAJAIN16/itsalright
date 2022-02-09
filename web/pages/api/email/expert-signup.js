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
    subject: "Thank you for signing up at Itsalright as an Expert!",
    html: `
       <h1>Thank you for signing up at itsalright!</h1>
       We hope that we can provide you an amazing experience!
       <br>
       By becoming an expert, you have joined a club of over <b>1900<b> doctors, therapists, motivational speakers, etc.
       <br>
       At Itsalright we give a platform where you can help people on a large scale. Whatever your craft is, we give you a platform where you can showcase it and connect with people and help them
       <br>
       <br>
       <h3>Welcome to the club, we hope you have a great time !</h3>
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
