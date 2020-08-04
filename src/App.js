import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import history from './services/history';
import {connect} from 'react-redux';
import Routes from './routes';
import {getAllInitializations} from './actions/otherAction'

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }


  componentDidMount() {
      this.props.initializeAll()
  }
  render() {
    return (
      <Router history={history}>
      ` <Navbar/>
        <Routes />
      </Router>
    );
  } 
}
const mapDispatchToProps = (dispatch) => {
  return {
    initializeAll: () => {
      dispatch(getAllInitializations())
    },
  }
}
export default connect(null, mapDispatchToProps)(App);