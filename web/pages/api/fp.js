import { query, collection, where, getDocs } from "firebase/firestore";
import nodemailer from "nodemailer";

import genID from "../../lib/genID";
import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //First, query so that we get the user from our firestore collection
  const q = query(
    collection(db, "users"),
    where("email", "==", req.body.email)
  );

  //Send that to firestore
  const doc = await getDocs(q);

  if (doc.empty) {
    //No user exists with that email lol
    res.status(200).json({
      status: 200,
      authCode: "E3",
    });
  } else {
    //Generate OTP
    const otp = genID(6).toLowerCase();

    //Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.itsalright@gmail.com",
        pass: "Jimin@123",
      },
    });

    //Create Mail Options
    const mailOptions = {
      from: "noreply.itsalright@gmail.com",
      to: req.body.email,
      subject: "Reset Password on Itsalright",
      html: `
       <h1>Password Reset Confirmation</h1>
       Your OTP is <b>${otp}</b>
       <br>
       This OTP will only be valid for 5 minutes after creation
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        //Email Send Error
        res.status(200).json({
          status: 200,
          authCode: "E2",
        });
      } else {
        //Send that back with the user
        res.status(200).json({
          status: 200,
          authCode: "S1",
          otp: otp,
          t: Date.now(),
          obj: doc.docs[0].data(),
        });
      }
    });
  }
}
