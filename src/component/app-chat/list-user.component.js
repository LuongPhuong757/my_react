import React from 'react';
import { getLocalStorage } from '../../handle-local-storage';
import { Link } from 'react-router-dom';
export default function ListUserComponent(props) {
  const { listUser, createRoom } = props;
  const account = getLocalStorage('user')?.data?.user
  let renderUser = []
  if (listUser) {
    renderUser = listUser.map((user, index) => {
      if (user.id != account.id) {
        return (
          <div key={index} className="toast toast-user" role="alert" aria-live="assertive" aria-atomic="true" onClick={() => {
            createRoom({ user_id: user.id })
          }}>
            <Link to={`/message/${user.id}`} style={{ color: "rgb(56 55 55)" }}>
              <div className="toast-header">
                <img src={user.avatar}
                  className="rounded me-2" alt="..." />
                <strong className="me-auto">{user.userName}</strong>
              </div>
            </Link>
          </div>
        )
      }
    })
  }
  return (
    <div className="body-right">
      {renderUser}
    </div>
  )
}