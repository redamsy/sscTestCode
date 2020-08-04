import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid ,Button} from 'semantic-ui-react'
import CreateCar from '../../components/CreateCar'
import CarItem from '../../components/CarItem'
class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible:false
    };
  }
  
  componentDidMount() { 
  }
  render() {
    const CarsList = (props) => (
        <Grid colums={3} divided>
          {props.cars.map((car) => (
            <Grid.Column width={5}>
              <CarItem {...car}  carsImagesBaseURL={this.props.carsImagesBaseURL} />
            </Grid.Column>
          ))}
        </Grid>
      );
    
    return (
      <div>
        <div style={styles.form}>
          <Button onClick={()=>this.setState({visible:!this.state.visible})}>create Car</Button>
        </div>
        {this.state.visible ? 
        <div style={styles.form}>
          <CreateCar/>
        </div>
        :null}
        <div style={styles.form}>
          <CarsList cars={this.props.cars}/>
        </div>
      </div>
    );
  }

  
}
const mapStateToProps = (state) => {
    return {
        cars: state.other.cars,
        carsImagesBaseURL:state.auth.carsImagesBaseURL
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Cars);

  let styles = {
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop:'10px'
    },
  }