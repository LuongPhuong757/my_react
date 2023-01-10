import { connect } from 'react-redux'
import RoomChatComponent from '../../component/app-chat/room-chat.component';
import * as actions from '../../actions/app-chat.action'
function RoomChatContainer(props) {
    return (
        <RoomChatComponent {...props} />
    );
}
const mapStateToProps = (state) => {
    return {
        listMessage: state.appchat.listMessage,
        userChat: state.appchat.userChat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (data) => {
            dispatch(actions.sendMessage(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomChatContainer);