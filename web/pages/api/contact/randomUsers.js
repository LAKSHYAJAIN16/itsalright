import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(200).send(`Cannot ${req.method} /api/contact/randomUsers`);
  } else {
    //Get All Users
    const all = [];
    const allSnap = await getDocs(collection(db, "users"));
    allSnap.forEach((doc) => {
      const data = doc.data();

      //Check if he is an expert
      if (data.isExpert === true) {
        all.push(doc.data());
      }
    });

    res.status(200).json({
      data: all,
      status: 200,
    });
  }
}
