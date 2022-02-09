import { getDocs, collection } from "firebase/firestore";

import sort from "../../lib/sort";
import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //Get Params
  const sender = req.body.sender;
  const reciever = req.body.reciever;

  //Get All of the Messages in one go
  const messages = await getDocs(collection(db, "messages"));

  //Loop
  const extractedDocs = [];
  messages.forEach((doc) => {
    const docData = doc.data();

    if (
      docData.sender.id === sender.id &&
      docData.reciever.id === reciever.id
    ) {
      extractedDocs.push(docData);
    }

    if (
      docData.sender.id === reciever.id &&
      docData.reciever.id === sender.id
    ) {
      extractedDocs.push(docData);
    }
  });

  //Now, sort the extractedDocs from the oldest to newest
  const sorted = sort(extractedDocs);

  //Return JSON
  res.status(200).json({
    data: sorted,
  });
}
