import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`); // 버전이 상승하면서 기존을 storageService.ref() 대신에 ref()를 사용.
      const response = await uploadBytes(attachmentRef, attachment); //마찬가지로 기존의 ref.putString 대신 uploadBytes 사용.
      attachmentUrl = await getDownloadURL(response.ref); // response의 ref를 url에 추가
    }
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
      attachmentUrl,
    });
    setNweet("");
    setAttachment("");
    setThumbnail("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile); //파일로부터 이미지 읽기
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setThumbnail(result);
    };
    setAttachment(theFile); // 업로드 파일
  };
  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={thumbnail} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
