import React, { useEffect, useRef } from "react";
import "./MyMessages.scss";
import { BiPlus } from "react-icons/bi";
import MiniFooter from "../../components/MiniFooter/MiniFooter";
function MyMessages() {
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="my-messages">
      <div className="my-messages__card">
        <div className="my-messages__card__top">
          <div className="my-messages__card__top__left">
            <h3>RECENT</h3>
            <BiPlus color="orange" size={35} />
          </div>

          <div className="my-messages__card__top__right">
            <h3>dragan cikaric</h3>
          </div>
        </div>
        <div className="my-messages__card__wrapper">
          <div className="my-messages__card__wrapper__side">
            <div className="my-messages__card__wrapper__side__top">
              <div className="my-messages__card__wrapper__side__user-chat my-messages__card__wrapper__side__user-chat--active">
                <span>dragan cikaric</span>
                <p>12:35 am</p>
              </div>

              <div className="my-messages__card__wrapper__side__user-chat">
                <span>milosav</span>
                <p>12:31 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>milan</span>
                <p>11:35 am</p>
              </div>

              <div className="my-messages__card__wrapper__side__user-chat">
                <span>dragisa</span>
                <p>10:35 am</p>
              </div>

              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
              <div className="my-messages__card__wrapper__side__user-chat">
                <span>zoran</span>
                <p>9:35 am</p>
              </div>
            </div>
          </div>
          <div className="my-messages__card__wrapper__chat">
            {/* Chat Messages Div */}
            <div
              className="my-messages__card__wrapper__chat__messages"
              ref={chatContainerRef}
            >
              {/* Your chat messages here */}

              <p className="my-messages__card__wrapper__chat__messages__my-message">
                <span>You</span> This is my message.
              </p>

              <p className="my-messages__card__wrapper__chat__messages__his-message">
                <span>dragan cikaric</span> This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__his-message">
                This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__his-message">
                This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__my-message">
                <span>You</span> This is my message.
              </p>

              <p className="my-messages__card__wrapper__chat__messages__my-message">
                This is my message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__my-message">
                This is my message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__his-message">
                <span>dragan cikaric</span> This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__his-message">
                This is his message.
              </p>

              <p className="my-messages__card__wrapper__chat__messages__his-message">
                This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__his-message">
                This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__my-message">
                <span>You</span> This is my message.
              </p>

              <p className="my-messages__card__wrapper__chat__messages__my-message">
                This is my message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__my-message">
                This is my message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__my-message">
                This is my message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__his-message">
                <span>dragan cikaric</span> This is his message.
              </p>
              <p className="my-messages__card__wrapper__chat__messages__my-message">
                <span>You</span> This is my message.
              </p>
              {/* More messages go here */}
              {/* You can use CSS to style my-message and his-message classes */}
            </div>

            {/* Input Field for Writing a Message */}
          </div>
        </div>

        <div className="my-messages__card__bottom">
          <div className="my-messages__card__bottom__left">
            <h3>MESSAGES</h3>
          </div>
          <div className="my-messages__card__bottom__chat-input">
            <input
              type="text"
              placeholder="Type your message and hit ENTER"
              // Add an event handler to handle message input
            />
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
}

export default MyMessages;
