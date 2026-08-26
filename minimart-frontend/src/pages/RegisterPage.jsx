import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Validation
        if (
            !username.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields");
            return;
        }

        if (username.trim().length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                 `${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        email: email.trim(),
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
                setError(
                    data.message ||
                    "Registration failed. Please try again."
                );
                return;
            }

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            // Redirect to login after 1.5 seconds
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            console.error("Registration error:", err);

            setError(
                "Unable to connect to server. Please check if Spring Boot is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-md w-96">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-gray-500 text-sm text-center mb-6">
                    Register for MiniMart
                </p>

                <form onSubmit={handleRegister}>

                    {/* Username */}
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

                    {/* Email */}
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        disabled={loading}
                    />

                    {/* Password */}
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

                    {/* Confirm Password */}
                    <label className="block text-sm font-medium mb-1">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError("");
                        }}
                        className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        disabled={loading}
                    />

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-lg mb-4">
                            {success}
                        </div>
                    )}

                    {/* Register */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-500 transition"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                {/* Login */}
                <div className="text-center mt-6 text-sm text-gray-600">

                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-black font-semibold hover:underline"
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}