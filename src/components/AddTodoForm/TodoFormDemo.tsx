import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";

type Todo = {
  id: string;
  text: string;
  description?: string;
  category: string;
  dueDate?: string;
  completed: boolean;
};

const TodoFormDemo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  };

  return (
    <div className="demo-container">
      <AddTodoForm onAdd={handleAddTodo} />
      {todos.length > 0 && (
        <div className="todo-list">
          <h3>Added Todos:</h3>
          {todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <h4>{todo.text}</h4>
              {todo.description && <p>{todo.description}</p>}
              <div className="meta">
                <span className={`tag tag-${todo.category.toLowerCase()}`}>
                  {todo.category}
                </span>
                {todo.dueDate && (
                  <span className="due">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoFormDemo;