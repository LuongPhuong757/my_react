import { combineReducers } from 'redux'
import AppChatReducers from './app-chat.reducers'
import LoginReducers from './login.reducers'
const rootReducer = combineReducers({
    login : LoginReducers,
    appchat: AppChatReducers
})

export default rootReducer