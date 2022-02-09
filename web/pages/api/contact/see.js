import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/contact/see`);
  } else {
    //Get the Data
    const msgs = req.body.msgs;

    //Loop through all of them and perform firebase queries
    for (let i = 0; i < msgs.length; i++) {
      const msg = msgs[i];

      //Update Doc
      await updateDoc(doc(db, "messages", msg.id), {
        seen: true,
      });
    }
    res.status(200).json("Everything went fine");
  }
}
