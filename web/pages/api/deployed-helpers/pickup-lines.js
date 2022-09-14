import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  const data = {
    line: req.body.line,
    id: req.body.id,
    scores: req.body.scores,
  };

  const doc2 = await getDoc(doc(db, "pickup-lines", data.id));

  if (doc2.exists()) {
    const data2 = doc2.data();
    const scores = data2.scores;
    const newScores = scores.concat(data.scores);
    await updateDoc(doc(db, "pickup-lines", data.id), {
      scores: newScores,
    });
    res.send("done method 2");
  } else {
    await setDoc(doc(db, "pickup-lines", data.id), data);
    res.send("done method 1");
  }
  res.send("hullo!");
}
