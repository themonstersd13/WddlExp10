import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api"

export default function TaskForm({ editTask, onSuccess, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: "",
  });

  useEffect(() => {
    if (editTask) {
      setForm(editTask);
    } else {
      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        category: "",
      });
    }
  }, [editTask]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }
    try {
      let res;
      if (editTask) {
        res = await api.put(`/tasks/${editTask._id}`, form);
      } else {
        res = await api.post("/tasks", form);
      }
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("Error submitting task:", err);
      alert("An error occurred while saving the task. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed top-0 right-0 w-full sm:w-1/2 h-full bg-white shadow-xl p-6 overflow-y-auto"
    >
      <h3 className="text-xl font-semibold mb-4">
        {editTask ? "Edit Task" : "New Task"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="dueDate"
            value={form.dueDate ? form.dueDate.split("T")[0] : ""}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            {editTask ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}