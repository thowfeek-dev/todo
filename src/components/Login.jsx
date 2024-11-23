import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Example validation (replace with your own logic)
        if (username === "admin" && password === "password") {
            onLogin(); // Update authentication state
            setError(""); // Clear error messages
            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 2000, // Close after 2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => navigate("/"), 100); // Redirect after the toast
        } else {
            setError("Invalid username or password."); // Show error
            toast.error("Invalid login credentials!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                )}
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-400"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

