import React from 'react';
import {connect} from 'react-redux';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import DropdownList from '../../components/Dropdown';
import {updateRental} from '../../actions/otherAction'
class Rental extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            pickupDate:'',
            pickupTime:'',
            returnDate:'',
            returnTime:'',
            min:'',
            isPaid:'',
            addCharges:'',
            status_id:'',
            car_id:'',
            customer_id:'',
            visible:false
        };
      }
    
    componentDidMount(){
        var pickupDateTime=this.props.rental.pickupDate.split(" ");
        var returnDateTime=this.props.rental.returnDate.split(" ");
        this.setState({ 
            id:this.props.rental.id,
            pickupDate:pickupDateTime[0],
            pickupTime:pickupDateTime[1],
            returnDate:returnDateTime[0],
            returnTime:returnDateTime[1],
            isPaid:this.props.rental.isPaid,
            addCharges:this.props.rental.addCharges,
            status_id:this.props.rental.status_id,
            car_id:this.props.rental.car_id,
            customer_id:this.props.rental.customer_id,
        })
    }

    render(){
        console.log(this.state.status_id)
        var currentDate=new Date().toISOString().split("T")[0]
        return( 
        <div>
            <div style={styles.form}>
                <div>rental_id is  {this.props.match.params.rental_id} | </div>
                <div>car_id is  {this.props.rental.car_id} | </div>
                <div>payment(price) is  {this.props.rental.price} | </div>
                <div>car registaraion is  {this.props.car.registration}</div>
            </div>
            <div style={styles.form}>
                <Button onClick={()=>this.setState({visible:!this.state.visible})}>update rental</Button>
            </div>
            <div style={styles.form}>
                {this.state.visible ? 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} type='date' label='pickupDate' placeholder='pickupDate' name='pickupDate' value={this.state.pickupDate} onChange={this.handleChange} min={currentDate} required/>
                        <Form.Field control={Input} type='time' label='pickupTime' placeholder='pickupTime' name='pickupTime' value={this.state.pickupTime} onChange={this.handleChange} min={this.state.min} required/>

                        <Form.Field control={Input} type='date' label='returnDate' placeholder='returnDate' name='returnDate' value={this.state.returnDate} onChange={this.handleChange} min={currentDate} required/>
                        <Form.Field control={Input} type='time' label='returnTime' placeholder='returnTime' name='returnTime' value={this.state.returnTime} onChange={this.handleChange} min={this.state.min} required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} type='number' label='addCharges' placeholder='addCharges' name='addCharges'value={this.state.addCharges} onChange={this.handleChange} min={0} required/>
                        <Form.Field control={DropdownList} label='status' placeholder='status' action={this.handleChangeDropdown} name='status_id' value={this.state.status_id} options={this.props.statusOptions} required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Button type='submit'>submit</Button>
                        <Form.Field control={Checkbox} label='isPaid' name='isPaid'value={this.state.isPaid}  onChange={this.handleChange} required/>
                    </Form.Group>
                </Form>
                :null}
            </div>  
        </div>  
        )
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
        this.props.updateRental(this.state)
        //event.target.reset();
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.rental_id
    return {
        rental: state.other.rentals.find(rental => {
            return rental.id === parseInt(id, 10)
        }),
        car: state.other.cars.find(car => {
            return car.id === parseInt(state.other.rentals.find(rental => {
                return rental.id === parseInt(id, 10)
            }).car_id, 10)
        }),
        statusOptions: state.other.statusOptions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRental: (updatedRental) => {
            dispatch(updateRental(updatedRental))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rental);

let styles = {
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop:'10px'
    },
  }