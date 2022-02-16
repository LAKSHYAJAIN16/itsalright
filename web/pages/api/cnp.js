import {
  updateDoc,
  collection,
  where,
  query,
  doc,
  getDocs,
} from "firebase/firestore";
import { scryptSync, randomBytes } from "crypto";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //First, query so that we get the user from our firestore collection
  const q = query(
    collection(db, "users"),
    where("email", "==", req.body.email)
  );

  //Send that to firestore
  const docs = await getDocs(q);
  const realDoc = docs.docs[0];

  //Hash Password
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(req.body.password, salt, 64).toString(
    "hex"
  );
  const newPassword = `${salt}:${hashedPassword}`;

  //Update the doc
  await updateDoc(doc(db, "users", realDoc.id), {
      password : newPassword
  })

  //Prepare return data
  const returnData = realDoc.data();
  returnData.password = newPassword;

  //Return JSON
  res.status(200).json({
    status: "OK",
    data: returnData,
  });
}
