import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-6">

            <div className="max-w-3xl text-center">

                {/* BRAND */}
                <h1 className="text-6xl font-extrabold text-black mb-4">
                    MiniMart
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Retail Store Management System
                </p>

                {/* DESCRIPTION CARD */}
                <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Manage your <span className="font-semibold">products</span>,
                        track <span className="font-semibold">inventory stock</span>,
                        handle <span className="font-semibold">customers</span>,
                        and process <span className="font-semibold">orders with automatic billing & stock updates</span>.
                    </p>

                    <p className="mt-4 text-gray-500 text-sm">
                        Built for efficient retail store operations with real-time stock tracking.
                    </p>
                </div>

                {/* FEATURES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">

                    <div className="bg-white p-4 rounded-xl shadow">
                        📦 Product Management
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        🧾 Order Processing
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        📉 Low Stock Alerts
                    </div>

                </div>

                {/* CTA BUTTON */}
                <button
                    onClick={() => navigate("/login")}
                    className="bg-black text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
                >
                    Get Started
                </button>


            </div>

        </div>
    );
}