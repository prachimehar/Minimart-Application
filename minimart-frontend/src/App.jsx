import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/Dashboard";
import ProductsPage from "./pages/Products";
import OrdersPage from "./pages/Orders";
import CreateOrderPage from "./pages/CreateOrder";
import CustomersPage from "./pages/Customers";

import SidebarComponent from "./components/SidebarComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import OrderInvoicePage from "./pages/OrderInvoicePage.jsx";

function Layout({ logout }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <SidebarComponent logout={logout} />

            <div className="flex-1">

                <NavbarComponent logout={logout} />

                <div className="p-6">
                    <Routes>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="orders/create" element={<CreateOrderPage />} />
                        <Route path="customers" element={<CustomersPage />} />
                        <Route path="orders/:id" element={<OrderInvoicePage />} />

                        {/* default app route */}
                        <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                </div>

            </div>
        </div>
    );
}

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("login") === "true"
    );

    const login = () => {
        localStorage.setItem("login", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("login");
        localStorage.removeItem("user");
        setIsLoggedIn(false);

        window.location.href = "/";
    };

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={<LoginPage setIsLoggedIn={login} />}
                />
                <Route
                    path="/app/*"
                    element={
                        isLoggedIn
                            ? <Layout logout={logout} />
                            : <Navigate to="/login" />
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>

        </BrowserRouter>
    );
}