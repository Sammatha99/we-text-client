import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { catchError } from "../../utils";
import { constants } from "../../../utils";
import { chatroomsAction, thisUserAction } from "../../../features";
import { backendWithAuth } from "../../../api/backend";
import { useStore, actions } from "../../../contextStore/chatInput";
import { socket } from "../../../Global";

const ChatInputImage = ({ file, index }) => {
  const [, messageDispatch] = useStore();

  const handleRemoveImage = () => {
    messageDispatch(actions.removeImage(index));
  };

  if (file.type === "image")
    return (
      <>
        <div
          className="chat-input__image"
          style={{ backgroundImage: `url(${file.file})` }}
        >
          <div
            onClick={handleRemoveImage}
            className="chat-input__image-delete center"
          >
            <Icon icon="times" />
          </div>
        </div>
      </>
    );
  if (file.type === "video") {
    return (
      <>
        <div className="chat-input__image">
          <video>
            <source src={file.file} type="video/mp4" />
          </video>
          <div
            onClick={handleRemoveImage}
            className="chat-input__image-delete center"
          >
            <Icon icon="times" />
          </div>
        </div>
      </>
    );
  }
};

const ChatInputImagesWrapper = () => {
  const [messageState] = useStore();
  const [previews, setPreviews] = useState(null);

  useEffect(() => {
    if (messageState.images.length === 0 || !messageState.images) {
      setPreviews(null);
      return;
    }

    const objectUrls = messageState.images.map((image) => ({
      file: URL.createObjectURL(image.file),
      type: image.type,
    }));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl.file);
      });
    };
  }, [messageState.images, messageState.images.length]);

  return (
    <div className="chat-input__images-wrapper">
      {previews && (
        <>
          {previews.map((preview, index) => (
            <ChatInputImage index={index} key={index} file={preview} />
          ))}
          <label
            htmlFor="chat-input__image-input"
            className=" chat-input__image center chat-input__image--add"
          >
            <Icon icon="plus" />
          </label>
        </>
      )}
    </div>
  );
};

export default function ChatInput() {
  const [messageState, messageDispatch] = useStore();
  const imageType = useMemo(() => {
    const imageType = constants.imageType;
    imageType.push("image/gif", "video/mp4");
    return imageType;
  }, []);
  const dispatch = useDispatch();
  const thisUser = useSelector((state) => state.thisUser.value);
  const chatroomId = useSelector(
    (state) => state.chatrooms.value.selectedChatroom.id
  );
  const inputRef = useRef();

  const handleChatInputKeyDown = (e) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();
      handleSubmit();

      // Do something else such as send the message to back-end
      // ...
    }
  };

  const handleFileClick = (e) => {
    const validFiles = [];
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (imageType.includes(file.type)) {
        const type = file.type.split("/").shift();
        validFiles.push({ file, type });
      }
    });
    e.target.value = null;
    messageDispatch(actions.addImages(validFiles));
  };

  const handleRecordClick = () => {
    // handle open record
  };

  const handleEmojiClick = () => {
    // open emoji
  };

  const handleSendMessage = async (text, type) => {
    const dataToSend = {
      text,
      type,
      sender: thisUser.id,
      chatroomId: chatroomId,
      time: Date.now(),
    };

    try {
      const axios = await backendWithAuth();
      if (axios) {
        axios.post("/messages", dataToSend).then((res) => {
          console.log("chatinput.emit('send-message')");
          messageDispatch(
            actions.unshiftMessage({
              ...res.data,
              senderPopulate: thisUser,
            })
          );
          const updateData = {
            lastMessage: res.data.id,
            lastMessagePopulate: res.data,
            time: res.data.time,
            id: res.data.chatroomId,
          };
          dispatch(chatroomsAction.updateChatroom(updateData));
          dispatch(chatroomsAction.unshiftChatroom(updateData));

          socket.emit("send-message", res.data, {
            id: thisUser.id,
            avatar: thisUser.avatar,
            name: thisUser.name,
          });
        });
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      catchError(err);
    }
  };

  const handleSendFile = async (images) => {
    images.forEach(async (image) => {
      // upload file to firebase
      const imagePath = `chatrooms/${chatroomId}/${image.file.name}`;
      const imageRef = ref(getStorage(), imagePath);
      await uploadBytes(imageRef, image.file);

      // get the url after upload
      const text = await getDownloadURL(imageRef);

      // send backend
      handleSendMessage(text, image.type);
    });
  };

  const handleSubmit = () => {
    if (messageState.text.trim() !== "") {
      handleSendMessage(messageState.text.trim(), constants.messagesType.TEXT);
    }
    if (messageState.images.length !== 0) {
      handleSendFile([...messageState.images]);
    }

    messageDispatch(actions.clearMessageState());

    inputRef.current.focus();
  };

  const handleChangeInputText = (e) => {
    messageDispatch(actions.updateMessage(e.target.value));
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input__wrap">
        <div className="avatar avatar--x-small center">
          <img
            className="avatar"
            src={thisUser.avatar}
            alt={`${thisUser.name} avatar`}
          />
        </div>
        <div className="chat-input__input">
          <ChatInputImagesWrapper />
          <textarea
            ref={inputRef}
            onKeyDown={handleChatInputKeyDown}
            type="text"
            rows="3"
            placeholder="Insert text ...."
            value={messageState.text}
            onChange={handleChangeInputText}
          />
        </div>
      </div>
      <div className="chat-input__wrap">
        <div className="chat-input__icon-wrapper">
          <input
            id="chat-input__image-input"
            type="file"
            name="files[]"
            multiple
            accept="video/*,image/*"
            onChange={handleFileClick}
            hidden
          />
          <label htmlFor="chat-input__image-input" className="chat-input__icon">
            <Icon icon="photo-video" />
          </label>
          <div className="chat-input__icon" onClick={handleRecordClick}>
            <Icon icon="paperclip" />
          </div>
          <div className="chat-input__icon" onClick={handleEmojiClick}>
            <Icon icon="smile-beam" />
          </div>
        </div>
        <button className="btn btn--primary btn--small" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
