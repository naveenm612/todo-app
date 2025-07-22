import React, { useState } from 'react';
import './CategoryFilter.css';
import { Todo } from '../../hooks/useTodos';

type CategoryFilterProps = {
  todos: Todo[];
  onFilter: (category: string) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ todos, onFilter }) => {
  const [activeCategory, setActiveCategory] = useState<"All" | "Work" | "Personal" | "Shopping">("All");
  const [activeStatus, setActiveStatus] = useState<"All" | "Active" | "Completed">("All");

  const handleCategoryFilter = (category: "All" | "Work" | "Personal" | "Shopping") => {
    setActiveCategory(category);
    onFilter(category);
  };

  const handleStatusFilter = (status: "All" | "Active" | "Completed") => {
    setActiveStatus(status);
    };

  const statusCounts: Record<"All" | "Active" | "Completed", number> = {
    All: todos.length,
    Active: todos.filter(t => !t.completed).length,
    Completed: todos.filter(t => t.completed).length,
  };

  const categoryCounts: Record<"All" | "Work" | "Personal" | "Shopping", number> = {
    All: todos.length,
    Work: todos.filter(t => t.category === "Work").length,
    Personal: todos.filter(t => t.category === "Personal").length,
    Shopping: todos.filter(t => t.category === "Shopping").length,
  };

  const categories: { name: "All" | "Work" | "Personal" | "Shopping"; icon: string }[] = [
    { name: "All", icon: "all-icon" },
    { name: "Work", icon: "work-icon" },
    { name: "Personal", icon: "personal-icon" },
    { name: "Shopping", icon: "shopping-icon" }
  ];

  const statuses: ("All" | "Active" | "Completed")[] = ["All", "Active", "Completed"];

  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="filter-title">Filter by Status</div>
        <div className="filter-buttons1 status-filters">
          {statuses.map(status => (
            <button
              key={status}
              className={`filter-button1 ${activeStatus === status ? 'active' : ''}`}
              onClick={() => handleStatusFilter(status)}
            >
              {status}
              <span className="filter-count">{statusCounts[status]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-title">Filter by Category</div>
        <div className="filter-buttons1">
          {categories.map(category => (
            <button
              key={category.name}
              className={`filter-button1 ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category.name)}
            >
              <span className={`category-icon ${category.icon}`}></span>
              {category.name}
              <span className="filter-count">{categoryCounts[category.name]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
