import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchProducts, fetchTypes } from "../http/productAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { product } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchProducts(null, null, 1, 8).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.page, 10).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product, product.selectedType, product.page,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});
export default Shop;