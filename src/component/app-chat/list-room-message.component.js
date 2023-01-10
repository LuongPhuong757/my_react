import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../../handle-local-storage';
export default function ListRoomComponent(props) {
  const { listRoom, deleteRoom, socket, getMessage, getUserChatById, dataMessage } = props
  const joinRoom = (slug) => {
    socket.emit("join_room", slug);
    getMessage(slug)
  }
  const account = getLocalStorage('user')?.data?.user
  let renderRoom = []
  useEffect(() => {
    const user = getLocalStorage('user')
    props.getListRoom({ id: user ? user.id : '' })
  }, [dataMessage])
  if (listRoom) {
    let _listRoom = listRoom
    if (dataMessage) {
      _listRoom = listRoom.filter(item => item.id != dataMessage.roomId);
      _listRoom.unshift(listRoom.find(item => item.id == dataMessage.roomId));
    }
    renderRoom = _listRoom.map((room, index) => {
      let dataUser = room.user1
      if (dataUser.id == account.id) {
        dataUser = room.user2
      }
      let lastSender;
      if (account.id == room.lastSender) {
        lastSender = 'Your'
      }else {
        lastSender = dataUser.userName
      }
      return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" key={index} onClick={() => {
          joinRoom(room.id);
          getUserChatById(dataUser.id);
        }}>
          <Link to={`/message/${room.id}`} style={{ color: "rgb(56 55 55)" }}>
            <div className="toast-header">
              <img src={dataUser.avatar}
                className="rounded me-2" alt="..." />
              <strong className="me-auto">{dataUser.userName}</strong>
              <small>11 mins ago</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast"
                aria-label="Close" onClick={() => {
                  deleteRoom({ id: room.id })
                }}></button>
            </div>
            <div className="toast-body">
              {dataMessage && dataMessage.author == account.id && room.id == dataMessage.roomId ? "Your" :lastSender}
              : {dataMessage && room.id == dataMessage.roomId ? dataMessage.message : room.lastMessage}
            </div>
          </Link>
        </div>)
    })
  }
  return (
    <div className="body-left">
      <div>
        <div className="shadow sticky-top bg-light">
          <div className="body-search py-3 px-1 ">
            <div className="input-group">
              <input type="text" className="form-control rounded-pill"
                placeholder="Recipient's username" aria-label="Recipient's username"
                aria-describedby="basic-addon2" />
            </div>
          </div>
        </div>
        <div className="body-list-rooms">
          {renderRoom}
        </div>
      </div>
    </div>
  )
}