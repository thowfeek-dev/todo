import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus } from '../store/taskSlice';
import { useState } from "react";

const TaskCard = ({
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    assignee,
    priority,
}) => {
    const dispatch = useDispatch();
    const getDate = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString();
    };
    const startDateFormatted = getDate(startDate);
    const endDateFormatted = getDate(endDate);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-200 text-green-800";
            case "in progress":
                return "bg-blue-200 text-blue-800";
            case "pending":
                return "bg-yellow-200 text-yellow-800";
            case "deleted":
                return "bg-gray-200 text-gray-800";
            default:
                return "bg-white";
        }
    };

    const handleStatusChange = (newStatus) => {
        dispatch(toggleTaskStatus({ id, status: newStatus }));
    };

    return (
        <div className="flex flex-col rounded-xl justify-center gap-2 bg-white w-72 max-h-[270px] shadow-xl border ">
            <div className={`relative bg-clip-border mt-6 ml-4 mr-4 rounded-lg ${getStatusColor(status)} shadow-md h-45`}>
                <h1 className="anton-regular text-end pt-2 pr-3 text-sm">{priority}</h1>
                <h1 className="font-bold text-center text-md py-1 mb-5 ubuntu-bold">{title}</h1>
            </div>
            <div className="border-0 p-2 text-center">
                <p className="poppins-light">{description}</p>
                <div className="flex justify-between mt-[5px] text-sm font-semibold py-2 px-4">
                    <div className="flex flex-col">
                        <p>Start Date</p>
                        <p className="font-light">{startDateFormatted}</p>
                    </div>
                    <div className="flex flex-col">
                        <p>End Date</p>
                        <p className="font-light">{endDateFormatted}</p>
                    </div>
                </div>
            </div>
            <div className="footer p-3 flex items-center justify-between">
                <p className="font-light text-xs">{assignee}</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleStatusChange("Completed")}
                        className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-lg"
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => handleStatusChange("Deleted")}
                        className="bg-red-400 text-gray-800 text-xs px-3 py-1 rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    priority: PropTypes.string,
};

export default TaskCard;
