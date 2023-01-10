import * as constants from '../constants/app-chat.constants'

export const getListUser = (data) => {
    return {
        type: constants.GET_LIST_USER_REQUEST,
        payload: data
    }
}

export const getListRoom = (data) => {
    return {
        type: constants.GET_LIST_ROOM_REQUEST,
        payload: data
    }
}

export const createRoom = (data) => {
    return {
        type: constants.CREATE_ROOM_REQUEST,
        payload: data
    }
}

export const deleteRoom = (data) => {
    return {
        type: constants.DELETE_ROOM_REQUEST,
        payload: data
    }
}

export const getMessage = (data) => {
    return {
        type: constants.GET_MESSAGE_REQUEST,
        payload: data
    }
}

export const getUserById = (data) => {
    return {
        type: constants.GET_USER_BY_ID_REQUEST,
        payload: data
    }
}

export const sendMessage = (data) => {
    return {
        type: constants.SEND_MESSAGE_REQUEST,
        payload: data
    }
}

