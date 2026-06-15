import React, { useState, useEffect } from 'react';
import { Table, Container, Badge, Spinner } from 'react-bootstrap';
import { fetchOrders, updateOrderStatus } from '../http/orderAPI';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка загрузки заказов');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            loadOrders(); 
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка обновления статуса');
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            'NEW': 'primary',
            'PAID': 'warning',
            'COMPLETED': 'success',
            'CANCELLED': 'danger'
        };
        const labels = {
            'NEW': 'Новый',
            'PAID': 'Оплачен',
            'COMPLETED': 'Выполнен',
            'CANCELLED': 'Отменен'
        };
        return <Badge bg={colors[status]}>{labels[status] || status}</Badge>;
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Container className="mt-4">
            <h2>Список заказов</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Телефон</th>
                        <th>Адрес</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user?.email || order.userId}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>{order.totalPrice} ₽</td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>
                                <select 
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className="form-select form-select-sm"
                                >
                                    <option value="NEW">Новый</option>
                                    <option value="PAID">Оплачен</option>
                                    <option value="COMPLETED">Выполнен</option>
                                    <option value="CANCELLED">Отменен</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default OrderList;