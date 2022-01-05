import { useSelector } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function ChatInput() {
  /**
   * thisUser lấy từ redux store tổng
   * input lấy từ reducer chat
   */
  const thisUser = useSelector((state) => state.thisUser.value);

  const handleChatInputKeyDown = (e) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();

      // Do something else such as send the message to back-end
      // ...
    }
  };

  const handleFileClick = () => {
    // TODO open file to choose
  };

  const handleRecordClick = () => {
    // TODO open record
  };

  const handleEmojiClick = () => {
    // open emoji
  };

  const handleSubmit = () => {
    /**
     * send message: check then send
     * 1. reducer chat -> update messages -> clear input
     * 2. redux store -> chatroomsList(last messages)
     */
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
          <textarea
            onKeyDown={handleChatInputKeyDown}
            type="text"
            rows="3"
            placeholder="Insert text ...."
          />
        </div>
      </div>
      <div className="chat-input__wrap">
        <div className="chat-input__icon-wrapper">
          <div className="chat-input__icon" onClick={handleFileClick}>
            <Icon icon="photo-video" />
          </div>
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
