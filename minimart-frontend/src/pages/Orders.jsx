import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">

            <h1 className="text-4xl font-bold">
                Orders
            </h1>

            <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

                <table className="w-full">

                    <thead>
                    <tr className="border-b text-left text-gray-500">
                        <th className="py-3">Order ID</th>
                        <th className="py-3">Customer</th>
                        <th className="py-3">Status</th>
                        <th className="py-3">Total</th>
                        <th className="py-3">Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {orders.map((order) => (

                        <tr key={order.id} className="border-b">

                            <td className="py-4">
                                #{order.id}
                            </td>

                            <td>
                                {order.customer?.name}
                            </td>

                            <td>
                                {order.status}
                            </td>

                            <td>
                                ₹{order.totalAmount}
                            </td>

                            {/* 🔥 INVOICE LINK */}
                            <td>
                                <Link
                                    to={`/app/orders/${order.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    View Invoice
                                </Link>
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}