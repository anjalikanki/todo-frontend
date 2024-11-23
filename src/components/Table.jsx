// import React from 'react'
import axios from "axios";
import { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const Table = ({ todos, setTodos, isLoading }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));

    console.log(editText);
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      body: "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todo-backend-eight-olive.vercel.app/todo/${id}/`);

      // returning the new page after deleting and refreshing
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `https://todo-backend-eight-olive.vercel.app/todo/${id}/`,
        value
      );
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };

  return (
    <div className="flex justify-center items-center py-10">
      <table className="w-11/12 max-w-5xl shadow-lg bg-white rounded-xl border border-gray-200">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold text-center">Checkbox</th>
            <th className="p-4 text-sm font-semibold text-center">Todo</th>
            <th className="p-4 text-sm font-semibold text-center">Status</th>
            <th className="p-4 text-sm font-semibold text-center">
              Date Checked
            </th>
            <th className="p-4 text-sm font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center py-5 text-gray-600">
                Loading...
              </td>
            </tr>
          ) : (
            todos.map((todoItem) => (
              <tr
                key={todoItem.id}
                className="odd:bg-gray-50 even:bg-gray-100 hover:bg-blue-100 transition-colors"
              >
                <td className="p-4 text-center">
                  <span
                    onClick={() =>
                      handleCheckbox(todoItem.id, todoItem.completed)
                    }
                    className="inline-block cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    {todoItem.completed ? (
                      <MdOutlineCheckBox />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
                    )}
                  </span>
                </td>
                <td className="p-4 text-sm text-black font-bold text-center">
                  {todoItem.body}
                </td>
                <td className="p-4 text-sm text-center">
                  <span
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      todoItem.completed
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {todoItem.completed ? "Done" : "Incomplete"}
                  </span>
                </td>

                <td className="p-4 text-sm text-center">
                  {new Date(todoItem.created).toLocaleString()}
                </td>
                <td className="p-4 text-sm text-center flex justify-center gap-3">
                  <button
                    className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <MdEditNote onClick={() => setEditText(todoItem)} />
                  </button>
                  <button
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                    onClick={() => handleDelete(todoItem.id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-blue-50">
          <h2 className="font-bold text-lg mb-4">Edit Todo</h2>
          <input
            type="text"
            value={editText.body}
            className="input input-bordered w-full mb-4"
            onChange={handleChange}
          />
          <div className="modal-action">
            <form method="dialog">
              <button onClick={handleClick} className="btn btn-primary">
                Edit
              </button>
              <button className="btn btn-ghost ml-2">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Table;
