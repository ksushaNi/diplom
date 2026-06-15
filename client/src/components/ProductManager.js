import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Table, Container, Image } from 'react-bootstrap';
import { Context } from '../index';
import { fetchProducts, deleteProduct, fetchTypes } from '../http/productAPI';
import { observer } from 'mobx-react-lite';
import CreateProduct from './modals/CreateProduct';

const ProductManager = observer(() => {
    const { product } = useContext(Context);
    const [products, setProducts] = useState([]);
    //const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const loadProducts = useCallback(async () => {
        const data = await fetchProducts(undefined, 1, 100);
        setProducts(data.rows);
    }, []);

    useEffect(() => {
        loadProducts();
        fetchTypes().then(data => product.setTypes(data));
    }, [loadProducts, product]);

    const handleDelete = async (id) => {
        if (window.confirm('Удалить блюдо?')) {
            try {
                setDeletingId(id);
                await deleteProduct(id);
                await loadProducts();
            } catch (e) {
                alert(e.response?.data?.message || 'Ошибка удаления');
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleEdit = (item) => {
        setEditingProduct(item);
        setShowEditModal(true);
    };

    return (
        <Container className="mt-4">
            <CreateProduct
                show={showEditModal}
                onHide={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                    loadProducts();
                }}
                editingProduct={editingProduct}
            />
            <CreateProduct
                show={showCreateModal}
                onHide={() => {
                    setShowCreateModal(false);
                    loadProducts();
                }}
                editingProduct={null}
            />
            <div style={{ marginBottom: '20px' }}>
                <h2>Управление блюдами</h2>
                <Button
                    className="add-product-btn mt-2"
                    onClick={() => setShowCreateModal(true)}
                >
                    + Добавить блюдо
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <Image
                                    src={process.env.REACT_APP_API_URL + item.img}
                                    width={50}
                                    height={50}
                                    style={{ objectFit: 'cover' }}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price} ₽</td>
                            <td>{item.type?.name || '—'}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => handleEdit(item)}
                                    disabled={deletingId === item.id}
                                >
                                    ✏️
                                </Button>
                                {' '}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                    disabled={deletingId === item.id}
                                >
                                    {deletingId === item.id ? '...' : '🗑️'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default ProductManager;