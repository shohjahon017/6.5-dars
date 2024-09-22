import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue) {
      const newTodo = {
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(evant) => setInputValue(event.target.value)}
            placeholder="Add a new task"
            className="flex-grow p-3 bg-gray-700 text-white rounded-l-lg border border-gray-600 "
          />
          <button
            onClick={addTodo}
            className="bg-purple-600 text-white p-3 rounded-r-lg hover:bg-purple-700 transition"
          >
            +
          </button>
        </div>

        <h2 className="text-lg font-bold mb-2">Tasks to do</h2>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-gray-700 rounded-lg mb-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  className="mr-2 accent-purple-600"
                />
                <span>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-400 hover:text-red-500 transition"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
