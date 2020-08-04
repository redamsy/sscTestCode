import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
function RouteWrapper({
    component: Component, 
    isPrivate, 
   ...rest
}) {
    const logged = rest.logged;
    console.log("isPrivate "+isPrivate)
    console.log("logged "+logged)
    if(isPrivate){
        if(logged){
            console.log('1')
            return <Route  {...rest}  component={Component} />;
        }
        console.log('2')
        return <Redirect to="/login" />;  
    } 
    if((Component.WrappedComponent.name==='LogIn'|| Component.WrappedComponent.name==='Register') && logged)
    {   
        console.log('3')
        return <Redirect to="/" />; 
    }
    console.log('4')
    return <Route  {...rest}  component={Component} />;
}

const mapStateToProps = (state) => {
    return {
        logged: state.auth.logged
    }
}
export default connect(mapStateToProps)(RouteWrapper);

RouteWrapper.defaultProps = {
    isPrivate: false,
  };