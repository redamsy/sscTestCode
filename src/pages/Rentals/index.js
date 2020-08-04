import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CreateRental from '../../components/CreateRental'
class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
  }
  
  componentDidMount() { 
  }
  render() {
    const rentalsList = this.props.rentals.map((rental) =>{
      return (
        <div>
          <div className='rental' key={rental.id} style={styles.form}>
            <Link to={'rental/'+rental.id}>
            <div>pickupDate: {rental.pickupDate}</div>
            <div>car id: {rental.car_id}</div>
            <div>rental price: {rental.price}</div>
            </Link>
          </div>
          <hr style={{width:'200px'}}/>
        </div>
      )
    })
    
    return (
      <div>
        <div style={styles.form}>
          <Button onClick={()=>this.setState({visible:!this.state.visible})}>create rental</Button>
        </div>
        {this.state.visible ? 
        <div style={styles.form}>
          <CreateRental/>
        </div>
        :null}
        <div >
          {rentalsList}
        </div>
      </div>
    );
  }

  
}
const mapStateToProps = (state) => {
    return {
        rentals: state.other.rentals,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Rentals);

  let styles = {
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }