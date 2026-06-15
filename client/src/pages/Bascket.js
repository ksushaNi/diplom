import React, { useContext, useState } from "react";
import { Button, Card, Container, Image, Table, Row, Col, Spinner, Form } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { SHOP_ROUTE } from "../utils/const";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../http/orderAPI";
import corzinaPng from "../assets/corzina.png";
import '../css/Bascket.css';

const Bascket = observer(() => {
    const { bascket, user } = useContext(Context);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const increaseQuantity = (productId) => {
        bascket.increaseQuantity(productId);
    };

    const decreaseQuantity = (productId) => {
        bascket.removeProduct(productId);
    };

    const removeProduct = (productId) => {
        bascket.deleteProduct(productId);
    };

    const checkout = async () => {
        if (!showForm) {
            setShowForm(true);
            return;
        }

        if (!address || !phone) {
            alert('Заполните все поля');
            return;
        }

        setLoading(true);
        try {
            await createOrder({
                userId: user.user.id,
                address: address,
                phone: phone,
                items: bascket.products,
                totalPrice: bascket.totalPrice
            });

            await bascket.clearBascket();
            setShowForm(false);
            setAddress('');
            setPhone('');
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка оформления');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4" style={{ minHeight: "70vh" }}>
            <h2 className="yourBascket mb-4">
                Ваша корзина
            </h2>

            {bascket.products.length > 0 ? (
                <>
                    <Table responsive className="table align-middle">
                        <thead>
                            <tr>
                                <th style={{ width: "15%" }}>Изображение</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bascket.products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <Image
                                            src={process.env.REACT_APP_API_URL + product.img}
                                            width={70}
                                            height={70}
                                            style={{ objectFit: 'cover', borderRadius: '5px' }}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price} ₽</td>
                                    <td>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => decreaseQuantity(product.id)}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{product.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => increaseQuantity(product.id)}
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>{product.price * product.quantity} ₽</td>
                                    <td>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => removeProduct(product.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Card className="itog mt-4 shadow">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <h4>
                                        Итого: <strong>{bascket.totalPrice} ₽</strong>
                                    </h4>
                                </Col>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Адрес доставки</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="ул. Примерная, д.1, кв.2"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Телефон</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="+7 (999) 123-45-67"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                                <Col md={6} className="text-end">
                                    <Button
                                        variant="success"
                                        size="lg"
                                        onClick={checkout}
                                        disabled={loading}
                                        className="button-order"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Оформляем...
                                            </>
                                        ) : 'Оформить заказ'}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <Card className="card text-center p-5 shadow">
                    <Card.Img
                        variant="top"
                        src={corzinaPng}
                        style={{ height: '200px', objectFit: 'contain' }}
                        className="mb-4"
                    />
                    <Card.Body>
                        <Card.Title className="card-title">Корзина пуста</Card.Title>
                        <Card.Text className="card-text mt-3">
                            Добавьте товары из нашего меню
                        </Card.Text>
                        <NavLink to={SHOP_ROUTE}>
                            <Button
                                variant="primary"
                                className="button-go-menu mt-3"
                            >
                                Перейти в меню
                            </Button>
                        </NavLink>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
});

export default Bascket;