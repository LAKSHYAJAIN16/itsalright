import { getDocs, doc, query, where, collection } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(200).send(`Cannot ${req.method} /api/posts`);
  } else {
    //Get Unanswered Documents
    const unanswered = [];
    const unansweredQuery = query(
      collection(db, "posts"),
      where("answered", "==", false)
    );
    const unansweredSnap = await getDocs(unansweredQuery);
    unansweredSnap.forEach((doc) => {
      unanswered.push(doc.data());
    });

    //Get All Documents
    const all = unanswered;

    res.status(200).json({
        status : 200,
        all
    })
  }
}
