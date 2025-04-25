// src/components/TaskCard.jsx
import { motion } from "framer-motion";
import axios from "axios";

export default function TaskCard({ task, onDelete, onToggle }) {
  const handleDelete = async () => {
    await axios.delete(`/api/tasks/${task._id}`);
    onDelete(task._id);
  };

  const handleToggle = async () => {
    const updated = await axios.put(`/api/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    onToggle(updated.data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
    >
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span
          className={`px-2 py-1 text-xs rounded ${
            task.status === "completed"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.status}
        </span>
        <div className="space-x-2">
          <button
            onClick={handleToggle}
            className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition duration-200 ease-in"
          >
            {task.status === "pending" ? "Complete" : "Reopen"}
          </button>
          <button
            onClick={handleDelete}
            className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition duration-200 ease-in"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
