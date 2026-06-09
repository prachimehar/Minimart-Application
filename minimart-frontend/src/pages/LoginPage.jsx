import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "Invalid username or password"
                );
                return;
            }

            // Save JWT details
            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "username",
                data.username
            );

            localStorage.setItem(
                "role",
                data.role
            );

            localStorage.setItem(
                "login",
                "true"
            );

            setIsLoggedIn(true);

            navigate("/app/dashboard");

        } catch (err) {

            console.error(err);

            setError(
                "Unable to connect to server. Please check if Spring Boot is running."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-md w-96">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    MiniMart Login
                </h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="w-full border p-3 mb-4 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full border p-3 mb-4 rounded"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-500"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}