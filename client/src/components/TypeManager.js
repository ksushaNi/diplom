import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Container, Form, Modal } from 'react-bootstrap';
import { Context } from '../index';
import { fetchTypes, createType, updateType, deleteType } from '../http/productAPI';
import { observer } from 'mobx-react-lite';

const TypeManager = observer(() => {
    const { product } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [editingType, setEditingType] = useState(null);
    const [typeName, setTypeName] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        loadTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadTypes = async () => {
        const data = await fetchTypes();
        product.setTypes(data);
    };

    const handleSave = async () => {
        if (!typeName.trim()) {
            alert('Введите название категории');
            return;
        }
        setLoading(true);
        try {
            if (editingType) {
                await updateType(editingType.id, typeName);
            } else {
                await createType({ name: typeName });
            }
            await loadTypes();
            setShowModal(false);
            setTypeName('');
            setEditingType(null);
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка сохранения');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (type) => {
        setEditingType(type);
        setTypeName(type.name);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Удалить категорию? Все блюда этой категории тоже удалятся.')) {
            try {
                await deleteType(id);
                await loadTypes();
            } catch (e) {
                alert(e.response?.data?.message || 'Ошибка удаления');
            }
        }
    };

    const handleAddNew = () => {
        setEditingType(null);
        setTypeName('');
        setShowModal(true);
    };

    return (
        <Container className="mt-4">
            <h2>Управление категориями</h2>
            <Button className="mb-3" onClick={handleAddNew}>
                + Добавить категорию
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {product.types.map(type => (
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td>{type.name}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleEdit(type)}>
                                    ✏️
                                </Button>
                                {' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(type.id)}>
                                    🗑️
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Модальное окно добавления/редактирования */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingType ? 'Редактировать' : 'Новая'} категория</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Название категории"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={loading}>
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default TypeManager;