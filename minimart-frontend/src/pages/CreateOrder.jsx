import { useState, useEffect } from "react";
import api from "../services/api";

export default function CreateOrder() {

    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {

        const fetchCustomers = async () => {

            try {

                const response = await api.get("/customers");

                setCustomers(response.data);

            } catch (error) {

                console.error("Failed to fetch customers:", error);

            }
        };

        fetchCustomers();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                customerId: Number(customerId), // ✅ Fix 3: now correctly set
                items: [
                    {
                        productId: Number(productId),
                        quantity: Number(quantity)
                    }
                ]
            };

            const response = await api.post("/orders", orderData);
            console.log("ORDER RESPONSE:", response.data);
            alert("Order Created Successfully");

            setCustomerId("");
            setCustomerName("");
            setProductId("");
            setQuantity("");

        } catch (error) {
            alert(error.response?.data || error.message || "Failed to create order");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold">Create Order</h1>

            <div className="bg-white p-6 rounded-2xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Customer Name */}
                    <div>
                        <label className="block mb-2">Customer Name</label>
                        <select
                            value={customerId}
                            onChange={(e) => {
                                const selected = customers.find(
                                    (c) => c.id === Number(e.target.value)
                                );
                                setCustomerId(e.target.value);          // ✅ stores ID for API
                                setCustomerName(selected?.name || "");  // ✅ stores name for display
                            }}
                            className="w-full border p-3 rounded-xl"
                            required
                        >
                            <option value="">-- Select Customer --</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Product ID */}
                    <div>
                        <label className="block mb-2">Product ID</label>
                        <input
                            type="number"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full border p-3 rounded-xl"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full border p-3 rounded-xl"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
                    >
                        Submit Order
                    </button>

                </form>
            </div>
        </div>
    );
}
