import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  const id = req.body.id;
  const data = {
    line: req.body.line,
    id: req.body.id,
    scores: req.body.scores,
  };

  const actDoc = doc(db, "pickup-lines", id)
  const doc2 = await getDoc(actDoc);

  if (doc2.exists()) {
    const data2 = doc2.data();
    const scores = data2.scores;
    const newScores = scores.concat(data.scores);
    await updateDoc(doc(db, "pickup-lines", id), {
      scores: newScores,
    });
    res.send("done method 2");
  } else {
    await setDoc(doc(db, "pickup-lines", id), data);
    res.send("done method 1");
  }
}
