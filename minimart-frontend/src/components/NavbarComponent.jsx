import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent({ logout }) {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const username =
        localStorage.getItem("username");

    const role =
        localStorage.getItem("role");

    const initials = username
        ? username.charAt(0).toUpperCase()
        : "U";

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (

        <div className="border-b bg-white px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-semibold">
                Retail Store Management System
            </h1>

            <div className="relative">

                <div
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer font-bold"
                >
                    {initials}
                </div>

                {open && (

                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl border p-4 z-50">

                        <p className="text-sm font-semibold">
                            {username}
                        </p>

                        <p className="text-xs text-gray-500 mb-3">
                            {role}
                        </p>

                        <hr className="mb-3" />

                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-500 hover:text-red-700"
                        >
                            Logout
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}