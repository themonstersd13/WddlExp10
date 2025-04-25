// src/components/TaskList.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api"; // your configured axios instance
import { AnimatePresence } from "framer-motion";

import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);          // always an array
  const [filter, setFilter] = useState("all");     // all | pending | completed
  const [editing, setEditing] = useState(null);    // the task being edited
  const [showForm, setShowForm] = useState(false); // form visibility

  // Fetch tasks whenever filter changes
  useEffect(() => {
    async function fetchTasks() {
      try {
        const params = filter !== "all" ? { status: filter } : {};
        const { data } = await api.get("/tasks", { params });
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]); // fallback to empty
      }
    }
    fetchTasks();
  }, [filter]);

  // Delete a task
  const onDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle a task’s status
  const onToggle = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      const { data: updated } = await api.patch(`/tasks/${task._id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  // After creating or updating a task
  const onSuccess = (task) => {
    if (editing) {
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? task : t))
      );
    } else {
      setTasks((prev) => [task, ...prev]);
    }
    closeForm();
  };

  // Open the form, optionally with a task to edit
  const openForm = (task = null) => {
    setEditing(task);
    setShowForm(true);
  };
  const closeForm = () => {
    setEditing(null);
    setShowForm(false);
  };

  // Client-side filter
  const visibleTasks = tasks.filter((t) =>
    filter === "all" ? true : t.status === filter
  );

  return (
    <div className="p-6">
      {/* Filter and New Task */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2 transition duration-200"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => openForm()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          + New Task
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {visibleTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={() => onDelete(task._id)}
              onToggle={() => onToggle(task)}
              onEdit={() => openForm(task)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showForm && (
          <TaskForm
            editTask={editing}
            onSuccess={onSuccess}
            onClose={closeForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
