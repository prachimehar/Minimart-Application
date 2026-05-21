import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    // FETCH CUSTOMERS
    const fetchCustomers = async () => {

        try {

            const response = await api.get("/customers");

            setCustomers(response.data);

        } catch (error) {

            console.error("Error fetching customers:", error);

        }
    };

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // SUBMIT CUSTOMER
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            // UPDATE
            if (editingId) {

                await api.put(`/customers/${editingId}`, formData);

            } else {

                // CREATE
                await api.post("/customers", formData);

            }

            // RESET FORM
            setFormData({
                name: "",
                email: "",
                phone: ""
            });

            setEditingId(null);

            fetchCustomers();

        } catch (error) {

            console.error("Error saving customer:", error);

            alert("Failed to save customer");

        } finally {

            setLoading(false);

        }
    };

    // EDIT CUSTOMER
    const editCustomer = (customer) => {

        setEditingId(customer.id);

        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        });
    };

    // DELETE CUSTOMER
    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/customers/${id}`);

            fetchCustomers();

        } catch (error) {

            console.error("Error deleting customer:", error);

            alert("Failed to delete customer");

        }
    };

    return (
        <div className="space-y-8">

            {/* PAGE HEADER */}
            <div>

                <h1 className="text-4xl font-bold">
                    Customers
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage store customers
                </p>

            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Customer Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 rounded-xl"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-3 rounded-xl"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-3 rounded-xl md:col-span-2"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition md:col-span-2"
                >
                    {loading
                        ? "Saving..."
                        : editingId
                            ? "Update Customer"
                            : "Add Customer"}
                </button>

            </form>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

                <table className="w-full">

                    <thead>

                    <tr className="border-b text-left text-gray-500">

                        <th className="py-3">ID</th>
                        <th className="py-3">Name</th>
                        <th className="py-3">Email</th>
                        <th className="py-3">Phone</th>
                        <th className="py-3">Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {customers.length > 0 ? (

                        customers.map((customer) => (

                            <tr
                                key={customer.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="py-4">
                                    {customer.id}
                                </td>

                                <td>
                                    {customer.name}
                                </td>

                                <td>
                                    {customer.email}
                                </td>

                                <td>
                                    {customer.phone}
                                </td>

                                <td className="space-x-2">

                                    <button
                                        onClick={() => editCustomer(customer)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center py-6 text-gray-500"
                            >
                                No customers found
                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}