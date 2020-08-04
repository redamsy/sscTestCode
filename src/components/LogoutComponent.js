import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/otherAction'
import { Button } from 'semantic-ui-react';
class LogoutComponent extends React.Component
{
  render()
  {
    return (
          <Button primary onClick={() => {this.props.logoutCall()}}>
              logout
          </Button>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      logged: state.auth.logged,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutCall: () => {
      dispatch(logout())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);