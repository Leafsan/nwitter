import Nweet from "../components/Nweet";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { dbService } from "../fbase";

const MyNweet = ({ userObj }) => {
  const [myNweets, setMyNweets] = useState([]);

  const getMyNweets = async () => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const newArray = snapshot.docs
        .filter((document) => document.data().createdId === userObj.uid)
        .map((document) => ({
          id: document.id,
          ...document.data(),
        }));
      setMyNweets(newArray);
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <div>
        {myNweets
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.createdId === userObj.uid}
            />
          ))}
      </div>
    </>
  );
};

export default MyNweet;
