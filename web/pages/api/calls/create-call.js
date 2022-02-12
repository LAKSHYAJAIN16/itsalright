import {
  setDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";
import genID from "../../../lib/genID";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/calls/create-call`);
  } else {
    //Get CallID
    const callID = genID(20);

    //Get URLs
    const userUrl = `http://localhost:1696/connect-rts/v2/zorbit?v=${callID}&b=true`;
    const expertUrl = `http://localhost:1696/connect-rts/v2/aorbit?v=${callID}&b=true`;

    //Create call with no expert
    await setDoc(doc(db, "available-calls", callID), {
      id: callID,
      userURL: userUrl,
      expertUrl: expertUrl,
      creator: req.body.user,
      expert: {},
      title : req.body.title,
      desc : req.body.desc,
      assigned: false,
    });

    //Return JSON
    res.status(200).json({
      status: "OK",
      id: callID,
      assigned: false,
      url: userUrl,
    });
  }
}
