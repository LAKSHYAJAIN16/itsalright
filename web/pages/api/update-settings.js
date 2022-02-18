import { updateDoc, doc } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //Firestore query
  const newData = {};
  newData[req.body.fieldName] = req.body.value;
  await updateDoc(doc(db, "users", req.body.id), newData);

  //Return JSON
  res.status(200).json({
    status: "OK",
    data: newData,
  });
}
