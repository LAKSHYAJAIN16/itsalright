import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";

import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //First, delete the User doc itself
  await deleteDoc(doc(db, "users", req.body.id));

  //Then, get all of the posts and delete each one where the user is the writer
  const allPosts = await getDocs(collection(db, "posts"));
  allPosts.forEach(async(da) => {
    const data = da.data();
    if (data.user.id === req.body.id) {
      //Delete that Post
      await deleteDoc(doc(db, "posts", da.id));
    }
  });

  //Then, delete all messages
  const allMsgs = await getDocs(collection(db, "messages"));
  allMsgs.forEach(async(da) => {
    const data = da.data();
    if (data.reciever.id === req.body.id) {
      //Delete that Message
      await deleteDoc(doc(db, "messages", da.id));
    }
    if (data.sender.id === req.body.id) {
      //Delete that Message
      await deleteDoc(doc(db, "messages", da.id));
    }
  });
  
  res.status(200).json({
    status: "OK",
    success: "yeah boi noice",
  });
}
