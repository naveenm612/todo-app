// import { useState } from "react";
// import { Todo } from "../../hooks/useTodos";
// import DeleteIcon from '@mui/icons-material/Delete';
// import "./TodoItem.css";

// type TodoItemProps = {
//   todo: Todo;
//   onToggle: (id: string) => void;
//   onDelete: (id: string) => void;
// };

// const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleDeleteClick = () => {
//     setShowConfirm(true);
//   };

//   const handleConfirmDelete = () => {
//     onDelete(todo.id);
//     setShowConfirm(false);
//   };

//   const handleCancelDelete = () => {
//     setShowConfirm(false);
//   };

//   return (
//     <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
//       <input
//         type="checkbox"
//         checked={todo.completed}
//         onChange={() => onToggle(todo.id)}
//         aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
//       />

//       <div className="todo-content">
//         <div className="todo-title">{todo.text}</div>
//         {todo.description && (
//           <div className="todo-description">{todo.description}</div>
//         )}
//         <div className="todo-meta">
//           <small className="todo-category">{todo.category}</small>
//           {todo.dueDate && (
//             <small className="todo-due">Due Date: {todo.dueDate}</small>
//           )}
//         </div>
//       </div>

//       <button
//         className="delete-btn"
//         onClick={handleDeleteClick}
//         aria-label={`Delete ${todo.text}`}
//         title="Delete todo"
//       >
//         <DeleteIcon />
//       </button>

//       {showConfirm && (
//         <div className="confirm-dialog">
//           <p>Are you sure you want to delete?</p>
//           <div className="confirm-actions">
//             <button onClick={handleConfirmDelete} className="yes-btn">Yes</button>
//             <button onClick={handleCancelDelete} className="no-btn">No</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TodoItem;




import { useState } from "react";
import { Todo } from "../../hooks/useTodos";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./TodoItem.css";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEditClick: (todo: Todo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEditClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="todo-content">
        <div className="todo-title">{todo.text}</div>
        {todo.description && <div className="todo-description">{todo.description}</div>}
        <div className="todo-meta">
          <small className="todo-category">{todo.category}</small>
          {todo.dueDate && <small className="todo-due">Due: {todo.dueDate}</small>}
        </div>
      </div>

      <div className="todo-actions">
        <button className="edit-btn" onClick={() => onEditClick(todo)}>
          <EditIcon />
        </button>
        <button className="delete-btn" onClick={() => setShowConfirm(true)}>
          <DeleteIcon />
        </button>
      </div>

      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete?</p>
          <div className="confirm-actions">
            <button onClick={() => onDelete(todo.id)} className="yes-btn">Yes</button>
            <button onClick={() => setShowConfirm(false)} className="no-btn">No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
