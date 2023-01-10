import * as constants from '../constants/login.constants'


export const regesterAccount = (data) => {
    return {
        type: constants.REGESTER_REQUEST,
        payload: data
    }
}

export const loginAccount = (data) => {
    return {
        type: constants.LOGIN_REQUEST,
        payload: data
    }
}

export const sentOtp = (data) => {
    return {
        type: constants.SENT_OTP_REQUEST,
        payload: data
    }
}