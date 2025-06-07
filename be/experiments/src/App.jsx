import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleCompleted = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-12 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        <Plus size={20} className="mr-2" />
        Add Todo
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <span
              className={`text-lg ${
                todo.completed ? 'text-gray-500 line-through' : 'text-black'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleToggleCompleted(index)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              <Check size={20} className="mr-2" />
              {todo.completed ? 'Uncheck' : 'Check'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 