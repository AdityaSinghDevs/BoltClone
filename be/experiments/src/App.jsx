import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-12 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Add new todo"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(index)}
              className="mr-2"
            />
            <span
              className={`text-sm ${
                todo.completed ? 'text-gray-500 line-through' : 'text-gray-700'
              }`}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 