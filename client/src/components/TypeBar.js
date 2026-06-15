import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/TypeBar.css';

const TypeBar = observer(() => {
    const { product } = useContext(Context)
    return (
        <ListGroup>
            <ListGroup.Item
                className='button-type'
                style={{cursor: 'pointer'}}
                active={!product.selectedType.id}  
                onClick={() => product.setSelectedType({})}  
            >
                Всё меню
            </ListGroup.Item>
            
            {product.types.map(type =>
                <ListGroup.Item
                    className='button-type'
                    style={{cursor: 'pointer'}}
                    active={type.id === product.selectedType.id}
                    onClick={() => product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;