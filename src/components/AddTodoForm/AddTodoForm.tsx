import React, { useState, useEffect } from "react";
import "./AddTodoForm.css";

export type Todo = {
  id: string;
  text: string;
  description?: string;
  category: string;
  dueDate?: string;
  completed: boolean;
};

type Props = {
  onAdd: (todo: Todo) => void;
  onEdit?: (id: string, updated: Omit<Todo, "id" | "completed">) => void;
  editingTodo?: Todo | null;
  onCancelEdit?: () => void;
};

const categories = ["Work", "Personal", "Shopping"];

const AddTodoForm: React.FC<Props> = ({ onAdd, onEdit, editingTodo, onCancelEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    category: "Personal",
    dueDate: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editingTodo) {
      setIsOpen(true);
      setFormData({
        text: editingTodo.text,
        description: editingTodo.description || "",
        category: editingTodo.category,
        dueDate: editingTodo.dueDate || "",
      });
    }
  }, [editingTodo]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.text.trim()) newErrors.text = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.dueDate.trim()) newErrors.dueDate = "Due Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingTodo && onEdit) {
      onEdit(editingTodo.id, formData);
    } else {
      onAdd({
        id: Math.random().toString(36).substring(7),
        text: formData.text,
        description: formData.description,
        category: formData.category,
        dueDate: formData.dueDate,
        completed: false,
      });
    }

    setFormData({ text: "", description: "", category: "Personal", dueDate: "" });
    setErrors({});
  };
    if (!isOpen) {
    return (
      <div className="form-container">
        <button onClick={() => setIsOpen(true)} className="btn-add">
          <span>+</span> Add New Todo
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="form-group">
        <label>Title <span>*</span></label>
        <input
          value={formData.text}
          onChange={(e) => handleInputChange("text", e.target.value)}
          placeholder="What needs to be done?"
        />
        {errors.text && <span className="error-text">{errors.text}</span>}
      </div>

      <div className="form-group">
        <label>Description <span>*</span></label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Add a description"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category <span>*</span></label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>Due Date <span>*</span></label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
          {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button onClick={handleSubmit} className="btn-add">
          {editingTodo ? "Update Todo" : "Save Todo"}
        </button>
        <button
    onClick={() => {
      setIsOpen(false);
      setFormData({
        text: "",
        description: "",
        category: "Personal",
        dueDate: "",
      });
      setErrors({});
      onCancelEdit?.();
    }}
    className="btn-cancel"
  >
    Cancel
  </button>
      </div>
    </div>
  );
};

export default AddTodoForm;
