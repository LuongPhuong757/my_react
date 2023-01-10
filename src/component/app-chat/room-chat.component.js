import React, { useEffect, useRef, useState } from 'react';
import { getLocalStorage } from '../../handle-local-storage';
export default function RoomChatComponent(props) {
  const account = getLocalStorage('user')?.data?.user
  const { socket, username, slug, listMessage,userChat,sendMessage } = props
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const refEnd = useRef(null)
  let time =
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes();
  const sendMessageInRoom = async () => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: parseInt(slug),
        author: account.id,
        message: currentMessage,
        time
      };
      sendMessage({message: currentMessage,time,roomId: parseInt(slug),author: account.id})

      await socket.emit("send_message", messageData);
      setMessageList((list) => {
        return [messageData,...list]
      });
      setCurrentMessage("");
    }
  }
  useEffect(() => {
    let time =
    new Date(Date.now()).getHours() +
    ":" +
    new Date(Date.now()).getMinutes();
    scrollToBottom()
    socket.on("receive_message", (data) => {
      sendMessage({message: data.message,time,roomId: parseInt(slug),author: data.author})
      setMessageList((list) => {
        return [data,...list]
      });
    });

  }, [socket]);
  const scrollToBottom = () => {
    refEnd.current?.scrollIntoView({behavior: "smooth", block: "end",inline: "center"});
  }
  useEffect(() => {
    setMessageList([])
  }, [slug]);
  useEffect(() => {
    scrollToBottom()
  });
  let listMessageDisplay = [];
  let _listMessage = []
  if (listMessage) {
    if (messageList.length > 0) {
      _listMessage = [ ...messageList,...listMessage]
    } else {
      _listMessage = [...listMessage]
    }
    listMessageDisplay = _listMessage.map((messageContent, index) => {
      return (
        <div className="message" key={index}>
          <div className="bg-light rounded-pill p-1 px-4 mb-1 border" id={parseInt(username) != parseInt(messageContent.author) ? "left" : "right"}>
            {messageContent.message}
          </div>
        </div>
      );
    })
  }
  return (
    <div className="body-center">
      <nav className="navbar bg-light shadow sticky-top">
        <div className="container-fluid align-items-center py-1 sticky-top">
          <a className="navbar-brand align-items-center d-flex" href="#" >
            <img src={slug && userChat ? userChat.avatar : ''}
              className="d-inline-block align-text-top mx-3" style={{width : '50px'}}/>
            {slug && userChat ? userChat.userName : 'oke'}
          </a>
        </div>
      </nav>
      <div className="body-center-message px-3 py-6"  ref={refEnd}>
        {listMessageDisplay}
      </div>
      <div className="body-center-input sticky-bottom py-2 bg-light">
        <div className="input-group px-3">
          <input type="text" className="form-control rounded-pill" placeholder="Username"
            aria-label="Username" aria-describedby="basic-addon1"
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessageInRoom();
            }}
          />
        </div>
      </div>
    </div>
  )
}