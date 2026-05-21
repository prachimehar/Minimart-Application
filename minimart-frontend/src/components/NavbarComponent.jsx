import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent({ logout }) {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const initials = user?.name
        ? user.name.split(" ").map(n => n[0]).join("")
        : "U";

    return (
        <div className="border-b bg-white px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-semibold">
                Retail Store Management System
            </h1>

            <div className="relative">

                <div
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
                >
                    {initials}
                </div>

                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border p-3">

                        <p className="text-sm font-semibold">
                            {user?.name}
                        </p>

                        <p className="text-xs text-gray-500 mb-3">
                            {user?.email}
                        </p>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-500"
                        >
                            Logout
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}