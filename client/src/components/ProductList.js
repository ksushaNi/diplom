import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import '../css/ProductList.css';

const ProductList = observer(() => {
    const { product } = useContext(Context)
    return (
        <Row className='product-list'>
            {product.products.map(product => 
                <ProductItem key={product.id} product={product}/>
            )}
        </Row>
    );
});

export default ProductList;