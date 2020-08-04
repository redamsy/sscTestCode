import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Menu ,Button} from 'semantic-ui-react'
import LogoutComponent from './LogoutComponent'
class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }
    render() {
        const { activeItem } = this.state
        return(
            <Menu style={styles.Navbar} secondary>
                    <Link to='/home' className='brand-logo'>LOGO</Link>
                    <Menu.Item as={NavLink} to='/home' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
                    <Menu.Item as={NavLink} to='/dashboard' name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}/>
                    <Menu.Item as={NavLink} to='/cars' name='cars' active={activeItem === 'cars'} onClick={this.handleItemClick}/>
                    <Menu.Item as={NavLink} to='/rentals' name='rentals' active={activeItem === 'rentals'} onClick={this.handleItemClick}/>
                    <Menu.Menu position='right'>
                        {this.props.logged ? <LogoutComponent /> : this.props.history.location.pathname==='/login' ? <Button primary onClick={() => {this.props.history.push('/register')}}>register</Button> : <Button primary onClick={() => {this.props.history.push('/login')}}>login</Button>}
                    </Menu.Menu>
            </Menu>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      logged: state.auth.logged,
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
let styles = {
    Navbar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,.1)',
        paddingTop: '20px',
        paddingLeft: '100px',
        paddingRight: '100px',
        paddingBottom: '20px',
    },
  }