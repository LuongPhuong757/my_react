import * as actions from '../../actions/login.action'
import { connect } from 'react-redux'
import LoginComponent from '../../component/login/login.component';

function LoginContainer(props) {
    return (
        <LoginComponent {...props} />
    );
}
const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        regesterAccount: (data) => {
            dispatch(actions.regesterAccount(data))
        },
        loginAccount: (data) => {
            dispatch(actions.loginAccount(data))
        },
        sentOtp: (data) => {
            dispatch(actions.sentOtp(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);