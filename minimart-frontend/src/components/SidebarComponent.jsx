import { Link } from "react-router-dom";

function SidebarComponent({ logout }) {
    return (
        <div className="w-64 min-h-screen bg-black text-white p-5">

            <h1 className="text-2xl font-bold mb-10">
                MiniMart
            </h1>

            <ul className="space-y-4">

                <li>
                    <Link to="/app/dashboard" className="hover:text-gray-400">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/app/products" className="hover:text-gray-400">
                        Products
                    </Link>
                </li>

                <li>
                    <Link to="/app/orders" className="hover:text-gray-400">
                        Orders
                    </Link>
                </li>

                <li>
                    <Link to="/app/orders/create" className="hover:text-gray-400">
                        Create Order
                    </Link>
                </li>

                <li>
                    <Link to="/app/customers" className="hover:text-gray-400">
                        Customers
                    </Link>
                </li>

                <li>
                    <button
                        onClick={logout}
                        className="text-red-400 hover:text-red-200 mt-4"
                    >
                        Logout
                    </button>
                </li>

            </ul>

        </div>
    );
}

export default SidebarComponent;