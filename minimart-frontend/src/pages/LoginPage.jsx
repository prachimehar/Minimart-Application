import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    console.log("API URL:", API_URL);
console.log("Username:", username.trim());
console.log("Password:", password);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Please enter username and password");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        password: password,
                    }),
                }
            );

            let data = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
                if (response.status === 404) {
                    setError(
                        "User not registered. Please register first."
                    );
                } else if (response.status === 401) {
                    setError(
                        data.message || "Invalid username or password."
                    );
                } else {
                    setError(
                        data.message || "Login failed. Please try again."
                    );
                }

                return;
            }

            if (!data.token) {
                setError("Login failed. Token was not received.");
                return;
            }

            // Save JWT
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem(
                "username",
                data.username || username.trim()
            );

            if (data.role) {
                localStorage.setItem("role", data.role);
            }

            if (data.email) {
                localStorage.setItem("email", data.email);
            }

            localStorage.setItem("login", "true");

            setIsLoggedIn(true);

            navigate("/app/dashboard");

        } catch (err) {
            console.error("Login error:", err);

            setError(
                "Unable to connect to server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-md w-96">

                <h1 className="text-2xl font-bold mb-2 text-center">
                    MiniMart Login
                </h1>

                <p className="text-gray-500 text-sm text-center mb-6">
                    Login to continue
                </p>
                  
                <form onSubmit={handleLogin}>

                    <label className="block text-sm font-medium mb-1">
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                        className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        disabled={loading}
                    />

                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        disabled={loading}
                    />

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-500 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-black font-semibold hover:underline"
                    >
                        Register
                    </button>
                </div>

            </div>

        </div>
    );
}