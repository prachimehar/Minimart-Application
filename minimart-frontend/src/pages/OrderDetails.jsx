import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        fetchOrder();

    }, []);

    const fetchOrder = async () => {

        try {

            const response = await api.get(
                `/orders/${id}`
            );

            setOrder(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    if (!order) {

        return <h1>Loading...</h1>;

    }

    return (

        <div className="space-y-6">

            <h1 className="text-4xl font-bold">
                Order Details
            </h1>

            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">

                <p>
                    <strong>Order ID:</strong> #{order.id}
                </p>

                <p>
                    <strong>Status:</strong> {order.status}
                </p>

                <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.orderDate)
                        .toLocaleString()}
                </p>

                <h2 className="text-2xl font-bold mt-6">
                    Items
                </h2>

                <table className="w-full">

                    <thead>
                    <tr className="border-b">
                        <th className="py-3 text-left">
                            Quantity
                        </th>

                        <th className="py-3 text-left">
                            Unit Price
                        </th>
                    </tr>
                    </thead>

                    <tbody>

                    {order.items.map((item) => (

                        <tr
                            key={item.id}
                            className="border-b"
                        >

                            <td className="py-4">
                                {item.quantity}
                            </td>

                            <td>
                                ₹{item.unitPrice}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}