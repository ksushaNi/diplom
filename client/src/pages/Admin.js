import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Container} from 'react-bootstrap';
import TypeManager from '../components/TypeManager';
import ProductManager from '../components/ProductManager';
import OrderList from '../components/OrderList';
import '../css/Admin.css';

const Admin = observer(() => {
    const [showTypes, setShowTypes] = useState(false)
    const [showProducts, setShowProducts] = useState(false)
    const [ordersVisible, setOrdersVisible] = useState(false)
    
    return (
        <Container className="d-flex flex-column">
            <Button
                className='kategory mt-4 p-2'
                onClick={() => setShowTypes(true)}
            >
                Изменить категорию
            </Button>
            <Button
                className='dish mt-4 p-2'
                onClick={() => setShowProducts(true)}
            >
                Управление блюдами
            </Button>

            <Button
                className='orders mt-4 p-2 mb-4'
                onClick={() => setOrdersVisible(true)}
            >
                Список заказов
            </Button>
            
            {showTypes && (
                <div className="orders-modal-overlay" onClick={() => setShowTypes(false)}>
                    <div className="orders-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="orders-modal-close" onClick={() => setShowTypes(false)}>X</button>
                        <TypeManager />
                    </div>
                </div>
            )}
            {showProducts && (
                <div className="orders-modal-overlay" onClick={() => setShowProducts(false)}>
                    <div className="orders-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="orders-modal-close mt-4" onClick={() => setShowProducts(false)}>Х</button>
                        <ProductManager />
                    </div>
                </div>
            )}
            {ordersVisible && (
                <div className='order-overlay' onClick={() => setOrdersVisible(false)}>
                    <div className='order-content' onClick={(e) => e.stopPropagation()}>
                        <Button className='order-close mt-4' onClick={() => setOrdersVisible(false)}>X</Button>
                        <OrderList />
                    </div>
                </div>
            )}
        </Container>
        
    );
});

export default Admin;