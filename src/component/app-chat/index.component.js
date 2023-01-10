import React from 'react';
import ListRoomContainer from '../../container/app-chat/list-room.container';
import ListUserContainer from '../../container/app-chat/list-user.container';
import HeaderAppChatComponent from './header.component';
import io from "socket.io-client";
import { getLocalStorage } from '../../handle-local-storage';
import RoomChatContainer from '../../container/app-chat/room-chat.container';
const socket = io.connect("http://localhost:6969", { transports: ['websocket', 'polling', 'flashsocket'] }
);
export default function AppChatComponent(props) {
    const slug = props.match.params.slug
    const account = getLocalStorage('user')?.data?.user
    return (
        <>
            <HeaderAppChatComponent />
            <div className='body'>
                <ListRoomContainer socket={socket} slug={slug} />
                {slug ?
                    <RoomChatContainer username={account?.id} slug={slug} socket={socket} />
                    :
                    <figure class="text-center">
                        <blockquote class="blockquote">
                            <p>BẠN CÔ ĐƠN VÃI Ò</p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                         <cite title="Source Title">Hãy tìm ai đó nhắn tin đê</cite>
                        </figcaption>
                    </figure>
                }
                <ListUserContainer />
            </div>
        </>
    )
}