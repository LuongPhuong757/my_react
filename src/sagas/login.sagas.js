import * as loginConstants from '../constants/login.constants'
import * as fetchConstants from "../constants/fetch-api.constants"
import { put, takeEvery } from 'redux-saga/effects'
import * as handleStorage from '../handle-local-storage'
import connnectAPI from '../fetch-api/send-request'
function* resgesterAccount(action) {
    try {
        const path = 'auth/signup'
        const res = yield connnectAPI(fetchConstants.HTTP_POST, path, action.payload)
        if (res.error) {
            alert(`${res.message}`)
            throw new Error(`${res.message}`)
        }
        alert("Đăng kí thành công")
        window.location.reload()
        yield put({
            type: loginConstants.REGESTER_SUCCESS,
            payload: {
                listProduct: res.listProduct
            }
        })
    } catch (err) {
        yield put({
            type: loginConstants.REGESTER_FAILURE,
            payload: {
                message: err.message
            }
        })
    }
}

function* loginAccount(action) {
    try {
        const path = 'auth/login'
        const res = yield connnectAPI(fetchConstants.HTTP_POST, path, action.payload)
        if (res.error) {
            alert(`${res.message}`)
            throw new Error(`${res.message}`)
        }
        handleStorage.setLocalStorage('user', JSON.stringify(res))
        yield put({
            type: loginConstants.LOGIN_SUCCESS,
            payload: {
                data: res.data
            }
        })
        window.location.reload()
    } catch (err) {
        yield put({
            type: loginConstants.LOGIN_FAILURE,
            payload: {
                message: err.message
            }
        })
    }
}
function* sentOtp(action) {
    try {
        const path = `user-otp?email=${action.payload.email}`
        const res = yield connnectAPI(fetchConstants.HTTP_GET, path, action.payload)
        if (res.error) {
            alert(`${res.message}`)
            throw new Error(`${res.message}`)
        }
        alert("Sent email Success")
        yield put({
            type: loginConstants.SENT_OTP_SUCCESS,
            payload: {
                data: res.data
            }
        })
    } catch (err) {
        yield put({
            type: loginConstants.LOGIN_FAILURE,
            payload: {
                message: err.message
            }
        })
    }
}
export const sagaLogin = [
    takeEvery(loginConstants.REGESTER_REQUEST, resgesterAccount),
    takeEvery(loginConstants.LOGIN_REQUEST, loginAccount),
    takeEvery(loginConstants.SENT_OTP_REQUEST, sentOtp),
]