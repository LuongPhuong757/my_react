import * as constants from '../constants/app-chat.constants'
const DEFAULT_STATE = {
    error: false,
    messageError: '',
    isLoading: false
}

function AppChatReducers(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case constants.GET_LIST_USER_REQUEST:
        case constants.GET_LIST_ROOM_REQUEST:
        case constants.GET_USER_BY_ID_REQUEST:
        case constants.GET_MESSAGE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case constants.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                dataMessage: action.payload.dataMessage
            }
        case constants.GET_LIST_USER_SUCCESS:
            return {
                ...state,
                listUser: action.payload.listUser
            }
        case constants.GET_MESSAGE_SUCCESS:
            return {
                ...state,
                listMessage: action.payload.listMessage
            }
        case constants.GET_LIST_ROOM_SUCCESS:
            return {
                ...state,
                listRoom: action.payload.listRoom
            }
            case constants.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                userChat: action.payload.userChat
            }
        case constants.GET_MESSAGE_FAILURE:
        case constants.GET_LIST_USER_FAILURE:
        case constants.GET_LIST_ROOM_FAILURE:
        case constants.GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                error: true,
                messageError: action.payload.message
            }
        default:
            return {
                ...state
            }
    }
}

export default AppChatReducers