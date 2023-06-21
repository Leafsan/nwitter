import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactoy";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.createdId === userObj.uid}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
