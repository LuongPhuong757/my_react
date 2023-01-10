import * as actions from '../../actions/app-chat.action'
import { connect } from 'react-redux'
import ListUserComponent from '../../component/app-chat/list-user.component';
import { useEffect } from 'react';
import { getLocalStorage } from '../../handle-local-storage';

function ListUserContainer(props) {
  const user = getLocalStorage('user')
  useEffect(() => {
    props.getListUser()
  }, [])
  return (
    <ListUserComponent {...props} />
  );
}
const mapStateToProps = (state) => {
  return {
    listUser: state.appchat.listUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListUser: (data) => {
      dispatch(actions.getListUser(data))
    },
    createRoom: (data) => {
      dispatch(actions.createRoom(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListUserContainer);