import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import bigStar from '../assets/bigStar.png'
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";
import { Context } from "../index";
import '../css/ProductPage.css';

const ProductPage = () => {
    const [product, setProduct] = useState({info: []})
    const {id} = useParams() 
    const { bascket } = useContext(Context)
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [id])

    const addToBasket = () => {
        bascket.addNewProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            rating: product.rating
        });
    };
    
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image className="product-image" src={process.env.REACT_APP_API_URL + product.img} />
                </Col>
                <Col md={4} className="text-center">
                    <h2 className="product-title">{product.name}</h2>
                    
                    <div className="product-rating">
                        <div
                            className="star d-flex align-items-center justify-content-center"
                            style={{ background: `url(${bigStar}) no-repeat center center` }}
                        >
                            {product.rating}
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <Card
                        className="cena d-flex flex-column align-items-center justify-content-around"
                    >
                        <h3>От {product.price} ₽</h3>
                        <Button 
                            className="button"
                            onClick={addToBasket}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="m-3">
                <h1>Описание:</h1>
                <p className="product-description">
                    {product.description || ''}
                </p>
            </Row>
        </Container>
    );
};
export default ProductPage;