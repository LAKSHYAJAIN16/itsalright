import { doc, deleteDoc } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //First, delete the User doc itself
  await deleteDoc(doc(db, "posts", req.body.id));

  res.status(200).json({
    msg: "works boi wtf",
  });
}
