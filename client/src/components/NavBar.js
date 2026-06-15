import React, { useContext } from "react";
import "../css/NavBar.css";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, BASCKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/const";
import { Button, Container } from "react-bootstrap"
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
    const { user, bascket } = useContext(Context)
    const navigate = useNavigate()

    //console.log("User auth status:", user.isAuth)
    //console.log("Basket store:", bascket);

    const handleAdminClick = () => {
        console.log("Navigating to admin panel");
        navigate(ADMIN_ROUTE);
    };

    const handleBascketClick = () => {
        console.log("Navigating to basket, current items:", bascket.products);
        navigate(BASCKET_ROUTE);
    };

    const handleMenuClick = () => {
        navigate(SHOP_ROUTE);
    };

    const logOut = () => {
        console.log("Logging out")
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        navigate(SHOP_ROUTE)
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={NavLink} to={SHOP_ROUTE}>
                Бархат
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Button className="navbar-custom-button  me-3" onClick={handleMenuClick}>
                        Меню
                    </Button>
                    {user.isAuth ? (
                        <>
                            {user.user.role === 'ADMIN' && (
                                <Button className="navbar-custom-button" onClick={handleAdminClick}>
                                    Админ панель
                                </Button>
                            )}
                            <Button
                                className="navbar-custom-button ms-3"
                                onClick={handleBascketClick}
                            >
                                Корзина {bascket.products.length > 0 && `(${bascket.products.reduce((sum, item) => sum + item.quantity, 0)})`}
                            </Button>
                            <Button className="navbar-custom-button ms-3" onClick={logOut}>
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Button className="navbar-custom-button" onClick={() => navigate(LOGIN_ROUTE)}>
                            Авторизация
                        </Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar >
    );
});

export default NavBar;