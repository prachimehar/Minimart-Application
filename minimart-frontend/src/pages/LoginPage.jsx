import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        // empty check
        if (!username || !password) {
            setError("Enter credentials");
            return;
        }

        // password rule
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setError("");

        // save login state
        localStorage.setItem("login", "true");

        // save user
        localStorage.setItem("user", JSON.stringify({
            name: username
        }));

        setIsLoggedIn(true);

        // 🔥 IMPORTANT: redirect to dashboard
        navigate("/app/dashboard");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-md w-96">

                <h1 className="text-2xl font-bold mb-6">
                    Login
                </h1>

                <input
                    className="w-full border p-3 mb-4"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-full border p-3 mb-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleLogin}
                    className="bg-black text-white w-full py-3 rounded-xl"
                >
                    Login
                </button>

            </div>

        </div>
    );
}