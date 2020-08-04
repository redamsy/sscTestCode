import React from 'react';
import {connect} from 'react-redux';
import { Button, Checkbox, Form, Input, TextArea, Image, Grid, Card } from 'semantic-ui-react'
import DropdownList from '../../components/Dropdown';
import {updateCar} from '../../actions/otherAction'
class Car extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            registration:'',
            chassis:'',
            year:'',
            capacity:'',
            isAutomatic:false,
            equipment:'',
            flaw:'',
            mileage:'',
            model_id:'',
            fuel_id:'',
            type_id:'',
            color_id:'',
            hourlyRate:'',
            dailyRate:'',
            monthlyRate:'',
            file:[],
            visible:false
        };
      }
    
    componentDidMount(){
        this.setState({ 
            id:this.props.car.id,
            registration:this.props.car.registration,
            chassis:this.props.car.chassis,
            year:this.props.car.year,
            capacity:this.props.car.capacity,
            isAutomatic:this.props.car.isAutomatic,
            equipment:this.props.car.equipment,
            flaw:this.props.car.flaw,
            mileage:this.props.car.mileage,
            model_id:this.props.car.model_id,
            fuel_id:this.props.car.fuel_id,
            type_id:this.props.car.type_id,
            color_id:this.props.car.color_id,
            hourlyRate:this.props.car.rentalrates[0].rate,
            dailyRate:this.props.car.rentalrates[1].rate,
            monthlyRate:this.props.car.rentalrates[2].rate,
        })
    }

    render()
    {   console.log(this.props.match.params.car_id)
        const CarImages = (props) => (
            <Grid colums={3} divided>
            {props.images.map((image) => (
                <Grid.Column width={5}>
                    <Card.Group>
                        <Card key={image.id} fluid>
                            <Image src={props.carsImagesBaseURL+image.fileName} wrapped ui={false} />
                        </Card>
                    </Card.Group>                    
                </Grid.Column>
            ))}
            </Grid>
        );
        return( 
        <div>
            <div style={styles.form}>
            | hourly rate: {this.props.car.rentalrates[0].rate} | daily rate: {this.props.car.rentalrates[1].rate} | monthly rate: {this.props.car.rentalrates[2].rate}
            </div>
            <div style={styles.form}>
                <CarImages images={this.props.car.images} carsImagesBaseURL={this.props.carsImagesBaseURL}/>
            </div>
            <div style={styles.form}>
                <Button onClick={()=>this.setState({visible:!this.state.visible})}>update Car</Button>
            </div>
            <div style={styles.form}>
                {this.state.visible ? 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} label='registration' placeholder='registration' name='registration' value={this.state.registration} onChange={this.handleChange} required/>
                        <Form.Field control={Input} label='chassis' placeholder='chassis' name='chassis' value={this.state.chassis} onChange={this.handleChange} required/>
                        <Form.Field control={Input} type='number' label='year' placeholder='year' name='year' value={this.state.year} onChange={this.handleChange} max={new Date().getFullYear()} min={0} required/>
                        <Form.Field control={Input} type='number' label='capacity' placeholder='capacity' name='capacity' value={this.state.capacity} onChange={this.handleChange} min={0} required/>
                        <Form.Field control={Input} type='number' label='mileage' placeholder='mileage' name='mileage' value={this.state.mileage} onChange={this.handleChange} min={0} required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={TextArea} label='equipment' placeholder='equipment' name='equipment' value={this.state.equipment} onChange={this.handleChange} required/>
                        <Form.Field control={TextArea} label='flaw' placeholder='flaw' name='flaw' value={this.state.flaw} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={DropdownList} label='model' placeholder='model' action={this.handleChangeDropdown} name='model_id' value={this.state.model_id} options={this.props.modelOptions}  required/>
                        <Form.Field control={DropdownList} label='fuel' placeholder='fuel' action={this.handleChangeDropdown} name='fuel_id' value={this.state.fuel_id} options={this.props.fuelOptions}  required/>
                        <Form.Field control={DropdownList} label='type' placeholder='type' action={this.handleChangeDropdown} name='type_id' value={this.state.type_id} options={this.props.typeOptions}  required/>
                        <Form.Field control={DropdownList} label='color' placeholder='color' action={this.handleChangeDropdown} name='color_id' value={this.state.color_id} options={this.props.colorOptions}  required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} type='number' label='hourlyRate' placeholder='hourlyRate' name='hourlyRate' value={this.state.hourlyRate} onChange={this.handleChange} min={0} required/>
                        <Form.Field control={Input} type='number' label='dailyRate' placeholder='dailyRate' name='dailyRate' value={this.state.dailyRate} onChange={this.handleChange} min={0} required/>
                        <Form.Field control={Input} type='number' label='monthlyRate' placeholder='monthlyRate' name='monthlyRate' value={this.state.monthlyRate} onChange={this.handleChange} min={0} required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Button type='submit'>submit</Button>
                        <Form.Field control={Checkbox} label='isAutomatic' name='isAutomatic'value={this.state.isAutomatic}  onChange={this.handleChangeCheckbox}  required/>
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
    
        this.setState({ [name]: value });
    
        return true;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateCar(this.state)
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.car_id
    return {
        car: state.other.cars.find(car => {
            return car.id === parseInt(id, 10)
        }),        
        modelOptions: state.other.modelOptions,
        fuelOptions: state.other.fuelOptions,
        typeOptions: state.other.typeOptions,
        colorOptions: state.other.colorOptions,
        carsImagesBaseURL: state.auth.carsImagesBaseURL
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCar: (updatedCar) => {
            dispatch(updateCar(updatedCar))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Car);

let styles = {
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop:'10px'
    },
  }