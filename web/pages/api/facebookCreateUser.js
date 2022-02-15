import { setDoc, doc } from "firebase/firestore";

import { scryptSync, randomBytes } from "crypto";
import { db } from "../../lib/firebase";
import genID from "../../lib/genID";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send(`Cannot ${req.method} /api/facebookCreateUser`);
  } else {
    //Firestore query
    const id = genID(15);

    //Hash Password
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(req.body.password, salt, 64).toString(
      "hex"
    );
    const newPassword = `${salt}:${hashedPassword}`;
    const newData = {
      id: id,
      isExpert : req.body.isExpert,
      name : req.body.username,
      password : newPassword,
      email : req.body.email,
      profilePic: `https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg`,
      origin : "fb",
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
