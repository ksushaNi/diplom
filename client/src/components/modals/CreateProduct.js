import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { createProduct, updateProduct, fetchTypes } from "../../http/productAPI";
import { observer } from "mobx-react-lite";


const CreateProduct = observer(({ show, onHide, editingProduct = null }) => {
    const { product } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
    }, [product])

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name || '')
            setPrice(editingProduct.price || 0)
            setRating(editingProduct.rating || 0)
            setDescription(editingProduct.description || '')
            setFile(null)
            if (editingProduct.info && editingProduct.info.length > 0) {
                setInfo(editingProduct.info.map((item, index) => ({
                    title: item.title,
                    description: item.description,
                    number: Date.now() + index
                })))
            }
            const type = product.types.find(t => t.id === editingProduct.typeId)
            if (type) product.setSelectedType(type)
        }
    }, [editingProduct, product])

    // const addInfo = () => {
    //     setInfo([...info, { title: '', description: '', number: Date.now() }])
    // }
    // const removeInfo = (number) => {
    //     setInfo(info.filter(i => i.number !== number))
    // }

    // const changeInfo = (key, value, number) => {
    //     setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    // }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        if (!product.selectedType.id) {
            alert('Выберите категорию!');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        if (file) formData.append('img', file);
        formData.append('typeId', product.selectedType.id);
        formData.append('info', JSON.stringify(info));
        formData.append('rating', rating)
        formData.append('description', description);

        // Если редактируем
        if (editingProduct) {
            updateProduct(editingProduct.id, formData)
                .then(data => {
                    console.log('Успешно обновлен:', data);
                    onHide();
                    setName('');
                    setPrice(0);
                    setFile(null);
                    setInfo([]);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert(`Ошибка: ${error.response?.data?.message || error.message}`);
                });
        }
        // Если создаем новый
        else {
            createProduct(formData)
                .then(data => {
                    console.log('Успешно создан:', data);
                    onHide();
                    setName('');
                    setPrice(0);
                    setFile(null);
                    setInfo([]);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert(`Ошибка: ${error.response?.data?.error || error.message}`);
                });
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {editingProduct ? 'Редактировать блюдо' : 'Добавить блюдо'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{product.selectedType.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название продукта'
                    />
                    <Form.Control
                        value={price === 0 ? '' : price}
                        onChange={e => {
                            const value = e.target.value;
                            setPrice(value === '' ? 0 : Number(value))
                        }}
                        className='mt-3'
                        placeholder='Введите стоимость продукта'
                        type='number'
                        min="0"
                    />
                    <Form.Control
                        value={rating === 0 ? '' : rating}
                        onChange={e => {
                            const value = e.target.value;
                            setRating(value === '' ? 0 : Number(value))
                        }}
                        className='mt-3'
                        placeholder='Рейтинг (0-5)'
                        type='number'
                        min="0"
                        max="5"
                        step="0.1"
                    />
                    <Form.Control

                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    {editingProduct && !file && (
                        <div className="mt-2 text-muted">
                            Текущее изображение: {editingProduct.img}
                        </div>
                    )}
                    <hr />
                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className='mt-3'
                        placeholder='Описание блюда'
                        rows={3}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>
                    {editingProduct ? 'Сохранить' : 'Добавить'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;