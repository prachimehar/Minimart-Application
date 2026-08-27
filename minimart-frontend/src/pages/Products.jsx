/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stockQty: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const [creatingCategory, setCreatingCategory] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadInitialData = async () => {
      try {
        const productsRes = await api.get("/products");

        if (!ignore) setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      try {
        const categoriesRes = await api.get("/categories");

        if (!ignore) setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadInitialData();

    return () => {
      ignore = true;
    };
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE CATEGORY DROPDOWN CHANGE
  const handleCategorySelect = (e) => {
    if (e.target.value === "NEW") {
      setCreatingCategory(true);
      setFormData({
        ...formData,
        categoryId: "",
      });
    } else {
      setCreatingCategory(false);
      handleChange(e);
    }
  };

  // CREATE NEW CATEGORY INLINE
  const createCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const response = await api.post("/categories", {
        name: newCategoryName,
      });

      // Add new category to the list
      setCategories([...categories, response.data]);

      // Auto-select it in the form
      setFormData({
        ...formData,
        categoryId: response.data.id,
      });

      setNewCategoryName("");
      setCreatingCategory(false);
    } catch (error) {
      console.error("Error creating category:", error);
      alert(error.response?.data || "Failed to create category");
    }
  };

  // EDIT PRODUCT
  const editProduct = (product) => {
    setEditingId(product.id);

    setCreatingCategory(false);

    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stockQty: product.stockQty,
      categoryId: product.categoryId || product.category?.id || "",
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
        categoryId: parseInt(formData.categoryId),
      };

      console.log("SENDING:", payload);

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);

        alert("Product Updated Successfully");
      } else {
        await api.post("/products", payload);

        alert("Product Added Successfully");
      }

      // RESET FORM
      setFormData({
        name: "",
        sku: "",
        price: "",
        stockQty: "",
        categoryId: "",
      });

      setEditingId(null);

      // REFRESH PRODUCTS
      fetchProducts();
    } catch (error) {
      console.error("FULL ERROR:", error);

      console.error("RESPONSE:", error.response);

      console.error("DATA:", error.response?.data);

      alert(error.response?.data || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
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

      alert(error.response?.data || "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Products</h1>

        <p className="text-gray-500 mt-2">Manage inventory products</p>
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

        <div>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleCategorySelect}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full"
            required={!creatingCategory}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
            <option value="NEW">+ Add New Category</option>
          </select>

          {creatingCategory && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border p-2 rounded-xl flex-1 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={createCategory}
                className="bg-black text-white px-4 rounded-xl hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
          )}
        </div>

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
              <th className="py-3">Category</th>
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
                  <td className="py-4">{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.sku}</td>

                  <td>₹{product.price}</td>

                  <td>{product.stockQty}</td>
                  <td>{product.category?.name || "—"}</td>

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
                <td colSpan="7" className="text-center py-6 text-gray-500">
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