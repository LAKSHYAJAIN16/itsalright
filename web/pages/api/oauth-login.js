import { query, collection, where, getDocs } from "firebase/firestore";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //First, query so that we get the user from our firestore collection
  const q = query(
    collection(db, "users"),
    where("email", "==", req.body.email)
  );

  //Send that to firestore
  const doc = await getDocs(q);

  let error = false;
  if(doc.empty){
    error = true;
    res.status(200).json({
      status: 200,
      authCode: "E3",
    });
  }

  //Extract hashed password
  if (doc.docs.length > 1) {
    error = true;
    res.status(200).json({
      status: 200,
      authCode: "E2",
    });
  }

  if (error === false && doc.docs.length > 0) {
    const hashedPass = doc.docs[0].data().password;
    const [salt, key] = hashedPass.split(":");
    const hashedBuffer = scryptSync(req.body.password, salt, 64);
    const finalBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedBuffer, finalBuffer);

    if (match) {
      res.status(200).json({
        status: 200,
        authCode: "S1",
        data : doc.docs[0].data()
      });
    } else if (!match) {
      res.status(200).json({
        status: 200,
        authCode: "E1",
      });
    }
  }
}
