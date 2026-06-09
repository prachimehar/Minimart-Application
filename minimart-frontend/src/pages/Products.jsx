import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {

    const [products, setProducts] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        stockQty: "",
        categoryId: "1"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // FETCH PRODUCTS
    const fetchProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.error("Error fetching products:", error);

        }
    };

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // EDIT PRODUCT
    const editProduct = (product) => {

        setEditingId(product.id);

        setFormData({
            name: product.name,
            sku: product.sku,
            price: product.price,
            stockQty: product.stockQty,
            categoryId: "1"
        });
    };

    // ADD / UPDATE PRODUCT
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const payload = {
                name: formData.name,
                sku: formData.sku,
                price: parseFloat(formData.price),
                stockQty: parseInt(formData.stockQty),
                categoryId: parseInt(formData.categoryId)
            };

            console.log("SENDING:", payload);

            if (editingId) {

                await api.put(
                    `/products/${editingId}`,
                    payload
                );

                alert("Product Updated Successfully");

            } else {

                await api.post(
                    "/products",
                    payload
                );

                alert("Product Added Successfully");
            }

            // RESET FORM
            setFormData({
                name: "",
                sku: "",
                price: "",
                stockQty: "",
                categoryId: "1"
            });

            setEditingId(null);

            // REFRESH PRODUCTS
            fetchProducts();

        } catch (error) {

            console.error("FULL ERROR:", error);

            console.error("RESPONSE:", error.response);

            console.error("DATA:", error.response?.data);

            alert(
                error.response?.data ||
                "Operation failed"
            );

        } finally {

            setLoading(false);

        }
    };

    // DELETE PRODUCT
    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/products/${id}`);

            alert("Product deleted successfully");

            fetchProducts();

        } catch (error) {

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            alert(
                error.response?.data ||
                "Delete failed"
            );
        }
    };

    return (
        <div className="space-y-8">

            {/* PAGE HEADER */}
            <div>

                <h1 className="text-4xl font-bold">
                    Products
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage inventory products
                </p>

            </div>

            {/* ADD / UPDATE FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={formData.sku}
                    onChange={handleChange}
                    className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <input
                    type="number"
                    name="stockQty"
                    placeholder="Stock Quantity"
                    value={formData.stockQty}
                    onChange={handleChange}
                    className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                >
                    <option value="1">Electronics</option>
                    <option value="2">Groceries</option>
                    <option value="3">Fashion</option>
                    <option value="4">Books</option>
                    <option value="5">Stationery</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition md:col-span-2"
                >
                    {loading
                        ? "Processing..."
                        : editingId
                            ? "Update Product"
                            : "Add Product"}
                </button>

            </form>

            {/* PRODUCTS TABLE */}
            <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

                <table className="w-full">

                    <thead>

                    <tr className="border-b text-left text-gray-500">

                        <th className="py-3">ID</th>
                        <th className="py-3">Name</th>
                        <th className="py-3">SKU</th>
                        <th className="py-3">Price</th>
                        <th className="py-3">Stock</th>
                        <th className="py-3">Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {products.length > 0 ? (

                        products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                <td className="py-4">
                                    {product.id}
                                </td>

                                <td>
                                    {product.name}
                                </td>

                                <td>
                                    {product.sku}
                                </td>

                                <td>
                                    ₹{product.price}
                                </td>

                                <td>
                                    {product.stockQty}
                                </td>

                                <td className="space-x-2">

                                    <button
                                        onClick={() => editProduct(product)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(product.id)}
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
                                colSpan="6"
                                className="text-center py-6 text-gray-500"
                            >
                                No products found
                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}