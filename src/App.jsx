import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import Table from "./components/Table";

function App() {
  const [todos, setTodos] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    console.log(todos);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://todo-backend-eight-olive.vercel.app/todo/");
      console.log(response);

      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 min-h-screen bg-blue-100">
      <nav className="pt-10">
        <h1 className="text-5xl text-center pb-8">Anjali's Todo List</h1>
      </nav>

      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} setTodos={setTodos} isLoading={isLoading} />
    </div>
  );
}

export default App;
