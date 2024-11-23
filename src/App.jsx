import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import AddTask from "./components/AddTask";
import Sidebar from "./components/Sidebar";
import AllTasks from "./components/AllTasks";
import CompleteTask from "./components/CompleteTask";
import InProgressTask from "./components/InProgressTask";
import Dashboard from "./components/Dashboard";
import PendingTask from "./components/PendingTask";
import Deployed from "./components/Deployed";
import Deleted from "./components/Deleted";
import Login from "./components/Login"; // Import your Login component
import "./App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to handle login
    const handleLogin = () => {
        setIsAuthenticated(true); // Update state to indicate the user is logged in
    };

    return (
        <div className="flex h-full">
            <ToastContainer />
            {isAuthenticated && <Sidebar />} {/* Show Sidebar only if authenticated */}
            <Routes>
                {/* Public Route: Login, visible only if not authenticated */}
                {!isAuthenticated ? (
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                ) : (
                    <Route path="/" element={<Navigate to="/allTask" />} /> // Redirect to /allTask if authenticated
                )}

                {isAuthenticated ? (
                    <>
                        <Route path="/addTask" element={<AddTask />} />
                        <Route path="/allTask" element={<AllTasks />} />
                        <Route path="/completeTask" element={<CompleteTask />} />
                        <Route path="/pendingTask" element={<PendingTask />} />
                        <Route path="/deployedTask" element={<Deployed />} />
                        <Route path="/DeletedTask" element={<Deleted />} />
                        <Route path="/inProgressTask" element={<InProgressTask />} />
                        <Route path="/statsTask" element={<Dashboard />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </div>
    );
};

export default App;
