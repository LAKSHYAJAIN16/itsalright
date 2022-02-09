import { getDocs, collection } from "firebase/firestore";

import sort from "../../../lib/sort";
import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  //Get Params
  const expert = req.body.expert;

  //Get All of the Messages in one go
  const messages = await getDocs(collection(db, "messages"));

  //Loop
  const extractedDocs = [];
  messages.forEach((doc) => {
    const docData = doc.data();

    if (docData.sender.id === expert || docData.reciever.id === expert) {
      extractedDocs.push(docData);
    }
  });

  //Now sort them by chat
  const data = {};

  extractedDocs.map((val) => {
    //Get the person we're talking to's stuff
    const other_id = val.sender.id === expert ? val.reciever.id : val.sender.id;

    const other_pic =
      val.sender.id === expert
        ? val.reciever.profilePic
        : val.sender.profilePic;

    const other_name =
      val.sender.id === expert ? val.reciever.name : val.sender.name;

    const other = val.sender;

    //Get the Keys
    const keys = Object.keys(data);
    if (keys.includes(other_id) === true) {
      //Push it to array
      data[other_id].messages.push(val);
    } else {
      //Create
      data[other_id] = {
        id: other_id,
        messages: [],
        pic: other_pic,
        name: other_name,
        talkee: other,
      };
      data[other_id].messages.push(val);
    }
  });

  //Now, sort the messages some more (add Unseen Messages)
  const keys = Object.keys(data);
  keys.map((val) => {
    //Sort the Messages from newest to oldest
    const newMessages = sort(data[val].messages);

    //Apply them
    data[val].messages = newMessages;

    //Go through all of the messages and check if it's read or unread
    let unSeenMessages = 0;
    data[val].messages.map((msg) => {
      if (msg.seen === false && msg.sender.id !== expert) {
        unSeenMessages += 1;
      }
    });

    //Add it to the data object
    data[val].unSeenMessages = unSeenMessages;
  });

  //Return JSON
  res.status(200).json({
    data,
  });
}
