import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text }]);
      setText("");
    }
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditing(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input
        data-testid="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo} data-testid="add-button">
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <input
                data-testid="edit-input"
                defaultValue={todo.text}
                onBlur={(e) => updateTodo(todo.id, e.target.value)}
              />
            ) : (
              <span data-testid="todo-text">{todo.text}</span>
            )}
            <button
              onClick={() => setEditing(todo.id)}
              data-testid="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
