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
    //Get All of the Available Experts
    const avexperts = await getDocs(collection(db, "available-experts"));

    if (avexperts.docs.length <= 1) {
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

    if (avexperts.docs.length > 1) {
      //Get CallID
      const callID = genID(20);

      //Get URLs
      const userUrl = `http://localhost:1696/connect-rts/v2/zorbit?v=${callID}&b=true`;
      const expertUrl = `http://localhost:1696/connect-rts/v2/aorbit?v=${callID}&b=true`;

      //Create call with the expert (check for cache first)
      if (avexperts.docs[0].id === "cache") {
        await setDoc(doc(db, "available-calls", callID), {
          id: callID,
          userURL: userUrl,
          expertUrl: expertUrl,
          creator: req.body.user,
          expert: avexperts.docs[1].data(),
          assigned: true,
        });

        //Delete Expert now cause he's on this call now
        await deleteDoc(doc(db, "available-experts", avexperts.docs[1].id));

        //Return JSON
        res.status(200).json({
          status: "OK",
          id: callID,
          assigned: true,
          url: userUrl,
        });
      }
      else {
        await setDoc(doc(db, "available-calls", callID), {
          id: callID,
          userURL: userUrl,
          expertUrl: expertUrl,
          creator: req.body.user,
          expert: avexperts.docs[0].data(),
          assigned: true,
        });

        //Delete Expert now cause he's on this call now
        await deleteDoc(doc(db, "available-experts", avexperts.docs[0].id));

        //Return JSON
        res.status(200).json({
          status: "OK",
          id: callID,
          assigned: true,
          url: userUrl,
        });
      }
    }
  }
}
