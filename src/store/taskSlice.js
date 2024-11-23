import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        status: action.payload.status || "Pending",
        assignee: action.payload.assignee || "",
        priority: action.payload.priority || "",
      };
      state.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const taskIndex = state.findIndex((task) => task.id === action.payload);
      state.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    toggleTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = status;
        if (status === "Deleted") {
          task.endDate = null; 
        } else if (status === "Completed") {
          task.endDate = new Date().toISOString();
        }
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },
  },
});

export const { addTask, removeTask, toggleTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
export const selectAllTasks = (state) => state.tasks;