import { setDoc, doc } from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/calls-create-av-expert`);
  } else {
    //Firestore query
    await setDoc(doc(db, "available-experts", req.body.user.id), req.body.user);

    //Return JSON
    res.status(200).json({
      status: "OK",
      data: req.body.user,
    });
  }
}
