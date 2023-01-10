import * as actions from '../../actions/app-chat.action'
import { connect } from 'react-redux'
import ListRoomComponent from '../../component/app-chat/list-room-message.component';

function ListRoomContainer(props) {
    return (
        <ListRoomComponent {...props} />
    );
}
const mapStateToProps = (state) => {
    return {
        listRoom: state.appchat.listRoom,
        dataMessage: state.appchat.dataMessage,
        listMessage: state.appchat.listMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMessage: (data) => {
            dispatch(actions.getMessage(data))
        },
        getListRoom: (data) => {
            dispatch(actions.getListRoom(data))
        },
        deleteRoom: (data) => {
            dispatch(actions.deleteRoom(data))
        },
        getUserChatById: (data) => {
            dispatch(actions.getUserById(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListRoomContainer);