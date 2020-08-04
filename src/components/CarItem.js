import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
const CarItem = ({id,registration, chassis, year, capacity, isAutomatic, equipment, flaw, mileage, isAvailable, model, fuel, type, color, created_at, updated_at, image, carsImagesBaseURL}) => {
    return(
        <Link to={'car/'+id}>
            <Card.Group>
                <Card key={id} fluid>
                    <Image src={carsImagesBaseURL+image.fileName} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{model}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{created_at}</span>
                        </Card.Meta>
                        <Card.Description>
                        registration:{registration}, chassis:{chassis}, year:{year}, capacity:{capacity}, isAutomatic:{isAutomatic}, 
                        equipment:{equipment}, flaw:{flaw}, mileage:{mileage}, fuel:{fuel}, type:{type}, color:{color}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {isAvailable?<a><Icon name='check' />Available</a>:<a><Icon name='ban' />Not Available</a>}
                    </Card.Content>
                </Card>
            </Card.Group>
        </Link>
    )
}

export default CarItem;