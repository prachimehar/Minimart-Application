import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [lowStock, setLowStock] = useState([]);

    useEffect(() => {
        fetchDashboard();
        fetchLowStock();
    }, []);

    // FETCH DASHBOARD
    const fetchDashboard = async () => {

        try {

            const res = await api.get("/orders/dashboard");

            setDashboard(res.data);

        } catch (err) {

            console.log("Dashboard Error:", err);

        }
    };

    // FETCH LOW STOCK PRODUCTS
    const fetchLowStock = async () => {

        try {

            // ✅ threshold changed to 10
            const res = await api.get("/products/low-stock?threshold=10");

            setLowStock(res.data);

        } catch (err) {

            console.log("Low Stock Error:", err);

        }
    };

    // STOCK STATUS
    const getStatus = (qty) => {

        if (qty <= 2) return "Critical";

        if (qty <= 10) return "Low";

        return "Normal";
    };

    // STOCK COLORS
    const getColor = (qty) => {

        if (qty <= 2) {
            return "bg-red-100 text-red-600";
        }

        if (qty <= 10) {
            return "bg-yellow-100 text-yellow-700";
        }

        return "bg-green-100 text-green-700";
    };

    return (
        <div className="space-y-8">

            {/* PAGE HEADER */}
            <div>

                <h1 className="text-4xl font-bold text-black">
                    MiniMart Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Retail Store Management Overview
                </p>

            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* TOTAL ORDERS */}
                <div className="bg-white rounded-2xl shadow-md p-6">

                    <h2 className="text-gray-500 text-sm">
                        Total Orders
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {dashboard?.totalOrders || 0}
                    </p>

                </div>

                {/* TOTAL REVENUE */}
                <div className="bg-white rounded-2xl shadow-md p-6">

                    <h2 className="text-gray-500 text-sm">
                        Total Revenue
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        ₹{dashboard?.totalRevenue || 0}
                    </p>

                </div>

                {/* LOW STOCK COUNT */}
                <div className="bg-white rounded-2xl shadow-md p-6">

                    <h2 className="text-gray-500 text-sm">
                        Low Stock Products
                    </h2>

                    <p className="text-4xl font-bold mt-3 text-red-500">
                        {lowStock.length}
                    </p>

                </div>

            </div>

            {/* LOW STOCK TABLE */}
            <div className="bg-white rounded-2xl shadow-md p-6">

                {/* SECTION HEADER */}
                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Low Stock Alerts
                    </h2>

                    {/* ✅ FIXED BUTTON */}
                    <button
                        onClick={() => navigate("/app/products")}
                        className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                        View Products
                    </button>

                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                        <tr className="border-b text-left text-gray-500">

                            <th className="py-3">Product</th>
                            <th className="py-3">SKU</th>
                            <th className="py-3">Stock Left</th>
                            <th className="py-3">Status</th>

                        </tr>

                        </thead>

                        <tbody>

                        {lowStock.length > 0 ? (

                            lowStock.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >

                                    <td className="py-4 font-medium">
                                        {item.name}
                                    </td>

                                    <td>
                                        {item.sku}
                                    </td>

                                    <td>
                                        {item.stockQty}
                                    </td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${getColor(item.stockQty)}`}
                                        >
                                            {getStatus(item.stockQty)}
                                        </span>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No low stock products
                                </td>

                            </tr>

                        )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}