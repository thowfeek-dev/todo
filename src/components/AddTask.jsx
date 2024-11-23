import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: new Date(),
        endDate: null,
        status: "Pending",
        assignee: "",
        priority: "P0",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEndDateChange = (date) => {
        setFormData({
            ...formData,
            endDate: date,
        });
    };

    const handleStartDateChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setFormData({
                ...formData,
                startDate: date,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title) {
            toast.error("Please fill in all required fields", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const serializableFormData = {
            ...formData,
            startDate: formData.startDate.toISOString(),
            endDate: formData.endDate ? formData.endDate.toISOString() : null,
        };

        dispatch(addTask(serializableFormData));

        toast.success("Task added successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setFormData({
            title: "",
            description: "",
            startDate: new Date(),
            endDate: null,
            status: "Pending",
            assignee: "",
            priority: "P0",
        });

        navigate("/"); // Redirect to the home page after successful submission
    };

    return (
        <div className="w-[70%] mx-auto">
            <div className="">
                <h1 className="text-3xl font-bold my-8 text-center">Add New Task</h1>
                <div className="grid place-items-center">
                    <form className="w-full mt-12 sm:mt-0 max-w-lg" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="title"
                                    type="text"
                                    placeholder="Task Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="description"
                                    placeholder="Task Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="startDate"
                                >
                                    Start Date
                                </label>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="appearance-none block w-[280px] sm:w-[245px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-2 sm:mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="endDate"
                                >
                                    End Date
                                </label>
                                <DatePicker
                                    selected={formData.endDate}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="appearance-none block w-[280px] sm:w-[245px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-8 w-full p-3 bg-sky-500 rounded-lg text-center text-white hover:bg-sky-300"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
