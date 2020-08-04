import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import DropdownList from './Dropdown';
import {createRental} from '../actions/otherAction'

class CreateRental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupDate:'',
      pickupTime:'',
      returnDate:'',
      returnTime:'',
      min:'',
      isPaid:'',
      car_id:'',
      customer_id:''
        
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
  }
  
  componentDidMount() {  
  }

  render() {
    var currentDate=new Date().toISOString().split("T")[0]
    return (
      <div >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field control={Input} type='date' label='pickupDate' placeholder='pickupDate' name='pickupDate' onChange={this.handleChange} min={currentDate} required/>
            <Form.Field control={Input} type='time' label='pickupTime' placeholder='pickupTime' name='pickupTime' onChange={this.handleChange} min={this.state.min} required/>

            <Form.Field control={Input} type='date' label='returnDate' placeholder='returnDate' name='returnDate' onChange={this.handleChange} min={currentDate} required/>
            <Form.Field control={Input} type='time' label='returnTime' placeholder='returnTime' name='returnTime' onChange={this.handleChange} min={this.state.min} required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={DropdownList} label='car' placeholder='car' action={this.handleChangeDropdown} name='car_id' options={this.props.carOptions} required/>
            <Form.Field control={DropdownList} label='customer' placeholder='customer' action={this.handleChangeDropdown} name='customer_id' options={this.props.customerOptions} required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Button type='submit'>submit</Button>
            <Form.Field control={Checkbox} label='isPaid' name='isPaid'  onChange={this.handleChange} required/>
          </Form.Group>
        </Form>
      </div>
    );
  }

  handleChangeDropdown = (event,{value,name}) => {
    this.setState({[name]:value});
    return true;
  }

  handleChangeCheckbox = (event,data) => {
    const value = data.checked ;
    const name = data.name;

    this.setState({ [name]: value });

    return true;
  }
  
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value }, () => {
      this.changeMinTime()
    });
    
    return true;
  }
  changeMinTime(){
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    var pickupDate = new Date(this.state.pickupDate)
    this.setState({min : pickupDate > d ? '00:00' : h+':'+m});
  }
  validateTimes(t1, t2){
      // get pickupTime
      var time = t1.split(":");
      var hour = time[0];
      if(hour === '00') {hour = 24}
      var min = time[1];
      var pickupTime = hour+"."+min;
      console.log(pickupTime)
      // get returnTime
      time = t2.split(":");
      hour = time[0];
      if(hour === '00') {hour = 24}
      min = time[1];
      var returnTime = hour+"."+min;
      console.log(returnTime)

      var totalTime = returnTime - pickupTime;
      console.log(totalTime)
      if (totalTime > 0) {
        return true
      }
      else return false
  }
  validateDates(){
    var x = new Date(this.state.pickupDate);
    var y = new Date(this.state.returnDate);
    if(x>y){
      alert("pickupDate shouldn't be greater than returnDate.")
      return false
    }
    if(+x === +y){
      if(this.validateTimes(this.state.pickupTime, this.state.returnTime)){
        return true
      }
      else return false
    }
    else return true
    //also test if x and y equal to z
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.validateDates()){
      console.log('success')
      this.props.createRental(this.state)
      //event.target.reset();
    }
    
  }
}
const mapStateToProps = (state) => {
  return {
    carOptions: state.other.cars.filter(car => car.isAvailable === 1).map(car => car),
    customerOptions: state.other.customerOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createRental: (newrental) => {
          dispatch(createRental(newrental))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRental);

