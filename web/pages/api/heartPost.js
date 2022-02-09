import { updateDoc, doc } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
    
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/heartPost`);
  } else {
    //Firestore query
    const newData = {
        hearts : req.body.hearts
    };
    await updateDoc(doc(db, "posts", req.body.id), newData);

    //Return JSON
    res.status(200).json({
        status : "OK",
        data : newData
    });
  }
}
