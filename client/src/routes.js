import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Bascket from "./pages/Bascket"
import Shop from "./pages/Shop"
import ProductPage from "./pages/ProductPage"
import { ADMIN_ROUTE, BASCKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/const"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASCKET_ROUTE,
        Component: Bascket
    }
]
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },     {
        path: LOGIN_ROUTE,
        Component: Auth
    },    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },

]