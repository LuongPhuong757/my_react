import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { handleFailure, handleSuccess } from '../../utils/google-auth.utils';
function LoginComponent(props) {
    const [isLogin, setIsLogin] = useState(true)
    const { regesterAccount, loginAccount, sentOtp } = props
    const openLogin = () => {
        setIsLogin(true)
    }
    const openRegister = () => {
        setIsLogin(false)
    }
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
            {isLogin ? <ComponentLogin openRegister={openRegister} loginAccount={loginAccount} />
                : <ComponentRegister openLogin={openLogin} regesterAccount={regesterAccount} sentOtp={sentOtp} />}
        </div>
    );
}

function ComponentLogin(props) {
    const { openRegister, loginAccount } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="card text-center login">
            <div className="card-header">
                <h2 className="card-title m-0 p-0">Login</h2>
            </div>
            <div className="card-body">
                <div className="list-input">
                    <div className="login-username">
                        <div className="input-group mb-3">
                            <span className="input-group-text justify-content-center" id="basic-addon1">Email</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <span className="input-group-text justify-content-center" id="basic-addon1">Password</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-secondary mr-3 m-3" onClick={() => {
                        loginAccount({ email, password })
                    }}>ĐĂNG NHẬP</button>
                    <button type="button" className="btn btn-info m-3" onClick={openRegister}>ĐĂNG KÍ</button>
                </div>
            </div>
        </div>
    )
}


function ComponentRegister(props) {
    const { openLogin, regesterAccount, sentOtp } = props
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const data = localStorage.getItem('loginData')
    const [loginData, setLoginData] = useState(
        data ? JSON.parse(data) : null
    );

    return (
        <div className="card text-center login">
            <div className="card-header">
                <h2 className="card-title m-0 p-0">Register</h2>
            </div>
            <div className="card-body">
                <div className="list-input">
                    <div className="login-username">
                        <div className="login-username">
                            <div className="input-group mb-3">
                                <span className="input-group-text justify-content-center" id="basic-addon1">Username</span>
                                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {
                                    setUserName(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text justify-content-center" id="basic-addon1">Email</span>
                            <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <button className="input-group-text" id="basic-addon2" onClick={() => { sentOtp({ email }) }}>Sent OTP</button>
                        </div>
                    </div>
                    <div className="login-username">
                        <div className="input-group mb-3">
                            <span className="input-group-text justify-content-center" id="basic-addon1">OTP</span>
                            <input type="text" className="form-control" placeholder="Otp" aria-label="Otp" aria-describedby="basic-addon1" onChange={(e) => {
                                setOtp(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div>
                        <div className="input-group mb-3">
                            <span className="input-group-text justify-content-center" id="basic-addon1">Password</span>
                            <input type="text" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        </div>
                    </div>
                    <div>
                        <button type="button" className="btn btn-secondary mr-3 m-3" onClick={openLogin}>ĐĂNG NHẬP</button>
                        <button type="button" className="btn btn-info m-3" onClick={() => {
                            regesterAccount({ userName, password, otp, email })
                        }}>ĐĂNG KÍ</button>
                        <button className="btn mr-3 m-3">
                            <GoogleLogin
                                clientId='933642933757-t9cu95m3g5p25d0r4oqnc8jt3eddoq6e.apps.googleusercontent.com'
                                buttonText='Sign in with Google'
                                onSuccess={handleSuccess}
                                onFailure={handleFailure}
                                cookiePolicy='single_host_origin'
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginComponent;