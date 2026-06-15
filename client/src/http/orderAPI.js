import { $authHost } from './index';

export const fetchOrders = async () => {
    const { data } = await $authHost.get('/api/order');
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await $authHost.post('/api/order', orderData);
    return data;
};

export const updateOrderStatus = async (orderId, status) => {
    const { data } = await $authHost.put(`/api/order/${orderId}/status`, { status });
    return data;
};