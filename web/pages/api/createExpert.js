import { setDoc, doc } from "firebase/firestore";

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { db } from "../../lib/firebase";
import genID from "../../lib/genID";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/createExpert`);
  } else {
    //Firestore query
    const id = genID(15);
    const apiKey = genID(15);
    const oauthKey = genID(15);

    //Hash Password
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(req.body.password, salt, 64).toString(
      "hex"
    );
    const newPassword = `${salt}:${hashedPassword}`;
    const newData = {
      id: id,
      isExpert: true,
      approved: false,
      expertData: {
        ...req.body.expertData,
      },
      dateAdded: new Date(Date.now()).toISOString(),
      name: req.body.username,
      password: newPassword,
      email: req.body.email,
      profilePic: `https://avatars.dicebear.com/api/big-ears-neutral/${id}.svg`,
      origin: "def",
      notifications: {
        nEmail: req.body.email,
        security: true,
        newsletters: true,
        comment: true,
        security: true,
        message : true
      },
      twofa: false,
      apiKey: apiKey,
      oauthKey: oauthKey,
      ts: new Date(Date.now()).toISOString(),
    };
    await setDoc(doc(db, "users", id), newData);

    //Return JSON
    res.status(200).json({
      status: "OK",
      docId: id,
      data: newData,
    });
  }
}
