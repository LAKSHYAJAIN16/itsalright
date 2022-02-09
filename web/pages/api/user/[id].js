import { getDoc, doc } from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  const { id } = req.query;

  //Firebase
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    res.status(200).json({
      status: 200,
      data: docSnap.data(),
    });
  } else {
    res.status(200).json({
      error: "Error : Document not found",
    });
  }
}
