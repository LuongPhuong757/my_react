import React from 'react';
import { removeLocalStorage } from '../../handle-local-storage';
export default function HeaderAppChatComponent(props) {
  const data = JSON.parse(localStorage.getItem('user'))?.data
  let user;
  if (data) user = data?.user
  const imageDefault = user ? user.avatar : 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
  const nameDefault = user ? user.userName : 'Account'

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand ">
          <img className="rounded-circle"
            src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/k/e/keyvisual_for_promotion-01_1_.jpg"
            alt="" width="40" height="40" />
        </a>
        <div className="d-flex align-items-center dropdown">
          <a className="navbar-brand text-light d-flex align-items-center" id="navbarNavDropdown">
            <img src={imageDefault}
              alt="" style={{ height: "30px" }} className="d-inline-block align-text-top rounded-circle" />
            <a className="nav-link dropdown-toggle text-light px-2" id="navbarDropdownMenuLink"
              role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {nameDefault}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li><a className="dropdown-item" onClick={() => {
                removeLocalStorage('user')
              }}>Đăng xuất</a></li>
            </ul>
          </a>
        </div>
      </div>
    </nav>
  )
}