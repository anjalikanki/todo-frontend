import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(newTodo);
  };

  const postTodo = async () => {
    try {
      await axios.post("https://todo-backend-eight-olive.vercel.app/todo/", newTodo);
      setNewTodo({ body: "" });
      fetchData(); // Refresh the data after adding a new todo
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-3/4 mx-auto my-6 p-6 bg-blue-50 shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Add a new todo..."
          className="input input-bordered w-full py-3 px-4 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          onChange={handleChange}
          value={newTodo.body}
        />
        <button
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition duration-200"
          onClick={postTodo}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              postTodo();
            }
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
