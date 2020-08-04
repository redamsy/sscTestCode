import React from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/otherAction'
class LogIn extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
        email: '',
        password: '' ,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render()
  {
    return (
      <div className="App">
          <input type='text' placeholder='email' name='email' onChange={this.handleChange}/>
          <input type='password' name='password' onChange={this.handleChange}/>
          <button onClick={() => {this.props.login(this.state)}}>
              login
          </button>
      </div>
    );
  }

  handleChange(event)
  {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });

    return true;
  }
  
}
const mapStateToProps = (state) => {
  return {
      logged: state.auth.logged,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);