import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react'
const SingleInputForm = (props)=> {
    return(
        <div>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group >
                    <Form.Field 
                        control={Input}
                        label={props.name}
                        placeholder={props.name} 
                        name={props.name} 
                        onChange={props.handleChange} 
                        required/>
                    <Button type='submit'>submit</Button>
                </Form.Group>
            </Form>
        </div>
    )
}
export default SingleInputForm;