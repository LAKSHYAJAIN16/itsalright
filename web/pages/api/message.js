import { setDoc, doc } from "firebase/firestore";

import { db } from "../../lib/firebase";
import genID from "../../lib/genID";

export default async function handler(req, res) {
    
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/message`);
  } else {
    //Firestore query
    const id = genID(15);
    const newData = {
      ...req.body,
      id: id,
    };
    await setDoc(doc(db, "messages", id), newData);

    //Return JSON
    res.status(200).json({
        status : "OK",
        docId : id,
        data : newData
    });
  }
}
