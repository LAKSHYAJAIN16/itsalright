import { updateDoc, doc, deleteField } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //Firestore query
  const newData = {
    isExpert: false,
  };
  await updateDoc(doc(db, "users", req.body.id), newData);

  //Return JSON
  res.status(200).json({
    status: "OK",
    data: "lol",
  });
}
