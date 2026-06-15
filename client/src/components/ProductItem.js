import { Card, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/const';
import { useContext } from 'react';
import { Context } from '..';
import '../css/ProductItem.css';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const { bascket } = useContext(Context);

    const addToBasket = (e) => {
        e.stopPropagation(); // Предотвращаем переход на страницу товара
        bascket.addNewProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            rating: product.rating
        });
    };

    return (
        <Col md={3} className={"product-page mt-3"}>
            <Card 
                className='product-card'
                style={{width: 153, cursor: 'pointer'}} 
                onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
            >
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/>
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center' style={{paddingLeft: '5px'}}>
                    <div>{product.category || "Категория"}</div>
                    <div className='d-flex align-items-center'>
                        <div>{product.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div style={{paddingLeft: '5px'}}>{product.name}</div>
                <div style={{paddingLeft: '5px'}}>{product.price} руб.</div>
                <Button 
                    className="product-item-button mt-2"
                    onClick={addToBasket}
                >
                    В корзину
                </Button>
            </Card>
        </Col>
    );
};

export default ProductItem;