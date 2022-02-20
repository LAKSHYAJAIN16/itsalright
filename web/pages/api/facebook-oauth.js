import { setDoc, doc } from "firebase/firestore";
import { scryptSync, randomBytes } from "crypto";

import genID from "../../lib/genID";
import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/facebook-oauth`);
  } else {
    //Gen Keys
    const apiKey = genID(15);
    const oauthKey = genID(15);

    //Hash Password
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(req.body.password, salt, 64).toString(
      "hex"
    );
    const newPassword = `${salt}:${hashedPassword}`;
    const newData = {
      id: req.body.password,
      isExpert: req.body.isExpert,
      name: req.body.username,
      password: newPassword,
      email: req.body.email,
      profilePic: `https://avatars.dicebear.com/api/adventurer-neutral/${req.body.password}.svg`,
      origin: "fb",
      notifications: {
        nEmail: req.body.email,
        security: true,
        newsletters: true,
        comment: true,
        security: true,
        message : true,
      },
      twofa: false,
      apiKey: apiKey,
      oauthKey: oauthKey,
      ts: new Date(Date.now()).toISOString(),
    };

    await setDoc(doc(db, "users", req.body.password), newData);

    //Return JSON
    res.status(200).json({
      status: "OK",
      docId: req.body.password,
      data: newData,
    });
  }
}
