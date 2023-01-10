import { all } from 'redux-saga/effects'
import { appChatSagas } from './app-chat.sagas'
import { sagaLogin } from './login.sagas'
export default function* rootSaga() {
  yield all([
    ...sagaLogin,
    ...appChatSagas
  ])
}