import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Checkbox, Form, Input, TextArea } from 'semantic-ui-react'
import DropdownList from './Dropdown';
import {createCar} from '../actions/otherAction'

class CreateCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registration:'',
      chassis:'',
      year:'',
      capacity:'',
      isAutomatic:false,
      equipment:'',
      flaw:'nothing wrong with this car',
      mileage:'',
      model_id:'',
      fuel_id:'',
      type_id:'',
      color_id:'',
      hourlyRate:'',
      dailyRate:'',
      monthlyRate:'',
      file:[]
        
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }
  
  componentDidMount() {  
  }

  render() {
    return (
      <div >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='registration' placeholder='registration' name='registration' onChange={this.handleChange} required/>
            <Form.Field control={Input} label='chassis' placeholder='chassis' name='chassis' onChange={this.handleChange} required/>
            <Form.Field control={Input} type='number' label='year' placeholder='year' name='year' onChange={this.handleChange} max={new Date().getFullYear()} min={0} required/>
            <Form.Field control={Input} type='number' label='capacity' placeholder='capacity' name='capacity' onChange={this.handleChange} min={0} required/>
            <Form.Field control={Input} type='number' label='mileage' placeholder='mileage' name='mileage' onChange={this.handleChange} min={0} required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={TextArea} label='equipment' placeholder='equipment' name='equipment' onChange={this.handleChange} required/>
            <Form.Field control={TextArea} label='flaw' placeholder='flaw' name='flaw' value='nothing wrong with this car' onChange={this.handleChange} required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={DropdownList} label='model' placeholder='model' action={this.handleChangeDropdown} name='model_id' options={this.props.modelOptions}  required/>
            <Form.Field control={DropdownList} label='fuel' placeholder='fuel' action={this.handleChangeDropdown} name='fuel_id' options={this.props.fuelOptions}  required/>
            <Form.Field control={DropdownList} label='type' placeholder='type' action={this.handleChangeDropdown} name='type_id' options={this.props.typeOptions}  required/>
            <Form.Field control={DropdownList} label='color' placeholder='color' action={this.handleChangeDropdown} name='color_id' options={this.props.colorOptions}  required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} type='number' label='hourlyRate' placeholder='hourlyRate' name='hourlyRate' onChange={this.handleChange} min={0} required/>
            <Form.Field control={Input} type='number' label='dailyRate' placeholder='dailyRate' name='dailyRate' onChange={this.handleChange} min={0} required/>
            <Form.Field control={Input} type='number' label='monthlyRate' placeholder='monthlyRate' name='monthlyRate' onChange={this.handleChange} min={0} required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Button type='submit'>submit</Button>
            <Form.Field control={Checkbox} label='isAutomatic' name='isAutomatic'  onChange={this.handleChangeCheckbox}  required/>
            images
            <Form.Field control={Input} type='file' name='file'  onChange={this.handleChangeFile} multiple  required/>
          </Form.Group>
        </Form>
      </div>
    );
  }

  maxSelectFile=(event)=>{
    let files = event.target.files // create file object
    if (files.length > 3) { 
      const msg = 'Only 3 images can be uploaded at a time'
      event.target.value = null // discard selected file
      alert(msg)
      return false;

    }
    return true;
 
  }

  handleChangeFile = (event) => {
    var files = event.target.files
    if(this.maxSelectFile(event)){ 
      // if return true allow to setState
      this.setState({
        file: files
      })
    }
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

    this.setState({ [name]: value });

    return true;
  }
  //this doesn't work with react semantic
  // handleChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({ [name]: value });

  //   return true;
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCar(this.state)
    //event.target.reset();
  }
}

const mapStateToProps = (state) => {
  return {
    modelOptions: state.other.modelOptions,
    fuelOptions: state.other.fuelOptions,
    typeOptions: state.other.typeOptions,
    colorOptions: state.other.colorOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createCar: (newcar) => {
          dispatch(createCar(newcar))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);

