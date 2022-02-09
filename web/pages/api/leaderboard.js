import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default async function handler(req, res) {
  //Get All of the Messages
  const messages = await getDocs(collection(db, "messages"));

  //Get All of the Posts
  const posts = await getDocs(collection(db, "posts"));

  //Loop the Messages first and increment
  const users = {};
  messages.forEach((doc) => {
    const data = doc.data();
    const keys = Object.keys(users);
    if (data.sender.isExpert === true && data.sender.isExpert !== undefined) {
      //Note the ID
      const senderID = data.sender.id;

      //Check if we have already added the guy to our list
      if (keys.includes(senderID) === true) {
        //Append Messages
        users[senderID]["messages"] += 1;
      } else if (keys.includes(senderID) === false) {
        //Create Data Object
        users[senderID] = { info: data.sender, messages: 1, posts: 0 };
      }
    }
  });

  //Now Loop the Posts
  posts.forEach((doc) => {
    const data = doc.data();
    const keys = Object.keys(users);

    //Loop through all the comments
    for (let i = 0; i < data.comments.length; i++) {
      const comment = data.comments[i];
      const senderID = comment.userID;
      if (comment.isExpertComment) {
        //Check if we have already added the guy to our list
        if (keys.includes(senderID) === true) {
          //Append Messages
          users[senderID]["posts"] += 1;
        } else if (keys.includes(senderID) === false) {
          //Create Data Object
          users[senderID] = {
            info: {
              profilePic: comment.userProfilePic,
              id: comment.userID,
              name: comment.username,
            },
            messages: 0,
            posts: 1,
          };
        }
      }
    }
  });

  //Now Calculate Points
  const keys = Object.keys(users);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const points = users[key].messages + users[key].posts * 2;
    users[key]["points"] = points;

    //Add Index
    users[key]["index"] = i + 1;
  }

  //Convert to Array to simplify Frontend
  const arr = Object.keys(users).map((key) => users[key]);

  res.status(200).json({
    data: arr,
  });
}
