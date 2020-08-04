import React from 'react';
import { Dropdown } from 'semantic-ui-react';
const DropdownList = (props) => {
   
    return(
        <Dropdown
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            clearable
            fluid
            search
            selection
            onChange={props.action}
            options={props.options}
        />
    )
}
export default DropdownList;