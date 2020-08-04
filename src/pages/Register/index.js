import React from 'react';
import {connect} from 'react-redux';
import {register} from '../../actions/otherAction'
class Register extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
        name:'',
        email: '',
        password: '' ,
        c_password:''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render()
  {
    return (
        <div className="App">
            <input type='text' placeholder='name' name='name' onChange={this.handleChange}/>
            <input type='text' placeholder='email' name='email' onChange={this.handleChange}/>
            <input type='password' name='password' onChange={this.handleChange}/>
            <input type='password' name='c_password' onChange={this.handleChange}/>
            <button onClick={() => {this.props.register(this.state)}}>
                register
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
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);