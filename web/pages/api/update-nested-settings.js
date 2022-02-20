import { updateDoc, doc, getDoc } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //Get the Data first
  const da = await getDoc(doc(db, "users", req.body.id));
  const dData = da.data();

  //Firestore query
  const dNotif = dData[req.body.nestedName];
  dNotif[req.body.fieldName] = req.body.value;
  await updateDoc(doc(db, "users", req.body.id), { notifications: dNotif });

  //Return JSON
  res.status(200).json({
    status: "OK",
    data: dNotif,
  });
}
