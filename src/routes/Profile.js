import { authService, dbService } from "../fbase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import Nweet from "../components/Nweet";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [myNweets, setMyNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    window.location.replace("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  // const getMyNweets = async () => {
  //   onSnapshot(collection(dbService, "nweets"), (snapshot) => {
  //     const newArray = snapshot.docs
  //       .filter((document) => document.data().createdId === userObj.uid)
  //       .map((document) => ({
  //         id: document.id,
  //         ...document.data(),
  //       }));
  //     setMyNweets(newArray);
  //   });
  // };
  //
  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <div>
        <button onClick={onLogOutClick}>Log Out</button>
      </div>
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

export default Profile;
