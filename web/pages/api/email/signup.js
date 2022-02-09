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
    subject: "Thank you for signing up at Itsalright!",
    html: `
       <h1>Thank you for signing up at itsalright!</h1>
       We hope that we can provide you an amazing experience!
       <br>
       To share something or vent out, use the <b>share</b> feature. Our Community will then answer your queries and give you solutions, free of cost
       <br>
       Or you can use the <b>contact</b> feature, and contact an expert(a doctor, therapist, etc), who will give their expert advice on your problem
       <br>
       Or if you're really down and just need someone to talk to you, use the <b>connect</b> feature. This will connect your video and audio to a random person, who you can share your problems to and connect.
       <br>
       <br>
       <h3>Once again, thanks for signing up. People like you are the ones who power this community. We hope you take the most out of this platform. Keep being happy and have fun!</h3>
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
