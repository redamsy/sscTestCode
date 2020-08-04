import React from 'react';
import {connect} from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react'
import DropdownList from '../../components/Dropdown';
import SingleInputForm from '../../components/SingleInputForm'
import {createColor, createFuel, createMake,createStatus, createType, createRentaltype,createModel, createCustomer} from '../../actions/otherAction'
class Dashboard extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            color:'',
            fuel:'',
            make:'',
            status:'',
            type:'',
            rentaltype:'',
            model:'',
            make_id:'',
            customer:'',
            contact:'',
            address:'',
            credentials:'',
            rate:'',
            car_id:'',
            rentaltype_id:'',
        };
    }
    
    
    componentDidMount() {
    }
    render()
    {
        return( 
            <div  style={styles.form}>
                <SingleInputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit1} name='color'/>
                <SingleInputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit2} name='fuel'/>
                <SingleInputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit3} name='make'/>
                <SingleInputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit4} name='status'/>
                <SingleInputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit5} name='type'/>
                <SingleInputForm handleChange={this.handleChange} handleSubmit={this.handleSubmit6} name='rentaltype'/>
                <Form onSubmit={this.handleSubmit7}>
                    <Form.Group widths='50'>
                        <Form.Field control={Input} label='model' placeholder='model' name='model' onChange={this.handleChange} required/>
                        <Form.Field control={DropdownList} label='make' placeholder='make' action={this.handleChangeDropdown} name='make_id' options={this.props.makeOptions} required/>
                        <Button type='submit'>submit</Button>
                    </Form.Group>
                </Form>
                <Form onSubmit={this.handleSubmit8}>
                    <Form.Group widths='50'>
                        <Form.Field control={Input} label='customer' placeholder='customer' name='customer' onChange={this.handleChange} required/>
                        <Form.Field control={Input} label='contact' placeholder='contact' name='contact' onChange={this.handleChange} required/>
                        <Form.Field control={Input} label='address' placeholder='address' name='address' onChange={this.handleChange} required/>
                        <Form.Field control={Input} label='credentials' placeholder='credentials' name='credentials' onChange={this.handleChange} required/>
                        <Button type='submit'>submit</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    
    handleChangeDropdown = (event,{value,name}) => {
        this.setState({[name]:value});
        return true;
    }
    
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
    
        return true;
    }

    handleSubmit1 = (event) => {
        event.preventDefault();
        this.props.createColor(this.state)
        event.target.reset();      
    }
    handleSubmit2 = (event) => {
        event.preventDefault();
        this.props.createFuel(this.state)
        event.target.reset();      
    }
    handleSubmit3 = (event) => {
        event.preventDefault();
        this.props.createMake(this.state)
        event.target.reset();      
    }
    handleSubmit4 = (event) => {
        event.preventDefault();
        this.props.createStatus(this.state)
        event.target.reset();
      
    }
    handleSubmit5 = (event) => {
        event.preventDefault();
        this.props.createType(this.state)
        event.target.reset();      
    }
    handleSubmit6 = (event) => {
        event.preventDefault();
        this.props.createRentaltype(this.state)
        event.target.reset();     
    }
    handleSubmit7 = (event) => {
        event.preventDefault();
        this.props.createModel(this.state)
        event.target.reset();      
    }
    handleSubmit8 = (event) => {
        event.preventDefault();
        this.props.createCustomer(this.state)
        event.target.reset();    
    }
    handleSubmit9 = (event) => {
        event.preventDefault();
        this.props.createRate(this.state)
        event.target.reset();
    }

}
const mapStateToProps = (state) => {
    return {
      makeOptions: state.other.makeOptions,
      carOptions: state.other.cars,
      rentaltypeOptions: state.other.rentaltypeOptions,
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        createColor: (newcolor) => {
            dispatch(createColor(newcolor))
        },
        createFuel: (newfuel) => {
            dispatch(createFuel(newfuel))
        },
        createMake: (newmake) => {
            dispatch(createMake(newmake))
        },
        createStatus: (newstatus) => {
            dispatch(createStatus(newstatus))
        },
        createType: (newtype) => {
            dispatch(createType(newtype))
        },
        createRentaltype: (newrentaltype) => {
            dispatch(createRentaltype(newrentaltype))
        },

        createModel: (newmodel) => {
            dispatch(createModel(newmodel))
        },
        createCustomer: (newcustomer) => {
            dispatch(createCustomer(newcustomer))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
let styles = {
    form: {
      marginTop:'10px',
      marginLeft:'50px'
    },
  }