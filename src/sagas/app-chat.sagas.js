import * as appChatConstants from '../constants/app-chat.constants'
import * as fetchConstants from "../constants/fetch-api.constants"
import { put, takeEvery } from 'redux-saga/effects'
import * as handleStorage from '../handle-local-storage'
import connnectAPI from '../fetch-api/send-request'
function* getListUser(action) {
  try {
    const res = yield connnectAPI(fetchConstants.HTTP_GET, 'users/list-user')
    if (res.error) {
      alert(`${res.message}`)
      throw new Error(`${res.message}`)
    }
    yield put({
      type: appChatConstants.GET_LIST_USER_SUCCESS,
      payload: {
        listUser: res
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.GET_LIST_USER_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}

function* getListRoom(action) {
  try {
    const res = yield connnectAPI(fetchConstants.HTTP_GET, 'rooms')
    if (res.error) {
      alert(`${res.message}`)
      throw new Error(`${res.message}`)
    }
    yield put({
      type: appChatConstants.GET_LIST_ROOM_SUCCESS,
      payload: {
        listRoom: res
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.GET_LIST_USER_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}

function* getUserChatById(action) {
  try {
    const res = yield connnectAPI(fetchConstants.HTTP_GET, `users/${action.payload}`)
    if (res.error) {
      alert(`${res.message}`)
      throw new Error(`${res.message}`)
    }
    yield put({
      type: appChatConstants.GET_USER_BY_ID_SUCCESS,
      payload: {
        userChat: res
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.GET_USER_BY_ID_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}

function* createRoom(action) {
  try {
    const user = handleStorage.getLocalStorage('user')
    const res = yield connnectAPI(fetchConstants.HTTP_POST, 'rooms', action.payload)
    if (res.error) {
      alert(`${res.message}`)
      throw new Error(`${res.message}`)
    }
    yield put({
      type: appChatConstants.CREATE_ROOM_SUCCESS,
      payload: {
        listRoom: res
      }
    })
    yield put({
      type: appChatConstants.GET_LIST_ROOM_REQUEST,
      payload: {
        id: { id: user ? user.id : '' }
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.CREATE_ROOM_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}

function* deleteRoom(action) {
  try {
    const user = handleStorage.getLocalStorage('user')
    const res = yield connnectAPI(fetchConstants.HTTP_DELETE, `rooms/${action.payload.id}`, action.payload)
    if (res.error) {
      alert(`${res.message}`)
      throw new Error(`${res.message}`)
    }
    yield put({
      type: appChatConstants.DELETE_ROOM_SUCCESS,
      payload: {
        listRoom: res
      }
    })
    yield put({
      type: appChatConstants.GET_LIST_ROOM_REQUEST,
      payload: {
        id: { id: user ? user.id : '' }
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.DELETE_ROOM_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}
function* getMessage(action) {
  try {
    const res = yield connnectAPI(fetchConstants.HTTP_GET, `messages?roomId=${action.payload}`, action.payload)
    if (res.error) {
      alert(`${res.message}`)
      throw new Error(`${res.message}`)
    }
    yield put({
      type: appChatConstants.GET_MESSAGE_SUCCESS,
      payload: {
        listMessage: res
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.GET_MESSAGE_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}
function* sendMessage(action) {
  try {
    yield put({
      type: appChatConstants.SEND_MESSAGE_SUCCESS,
      payload: {
        dataMessage: action.payload
      }
    })
  } catch (err) {
    yield put({
      type: appChatConstants.GET_MESSAGE_FAILURE,
      payload: {
        message: err.message
      }
    })
  }
}
export const appChatSagas = [
  takeEvery(appChatConstants.GET_LIST_USER_REQUEST, getListUser),
  takeEvery(appChatConstants.GET_LIST_ROOM_REQUEST, getListRoom),
  takeEvery(appChatConstants.CREATE_ROOM_REQUEST, createRoom),
  takeEvery(appChatConstants.DELETE_ROOM_REQUEST, deleteRoom),
  takeEvery(appChatConstants.GET_MESSAGE_REQUEST, getMessage),
  takeEvery(appChatConstants.SEND_MESSAGE_REQUEST, sendMessage),
  takeEvery(appChatConstants.GET_USER_BY_ID_REQUEST, getUserChatById),
]