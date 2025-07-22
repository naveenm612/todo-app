import React from "react";
import "./FilterButtons.css";

interface FilterButtonsProps {
  onSetFilter: (filter: "All" | "Active" | "Completed" | "Overdue") => void;
  activeFilter?: "All" | "Active" | "Completed" | "Overdue";
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  onSetFilter, 
  activeFilter = "All",
  stats 
}) => {
  const filterItems = [
    {
      key: "All" as const,
      label: "Total",
      count: stats.total,
      icon: "📊",
      color: "purple"
    },
    {
      key: "Completed" as const,
      label: "Completed",
      count: stats.completed,
      icon: "✅",
      color: "green"
    },
    {
      key: "Active" as const,
      label: "Active",
      count: stats.active,
      icon: "⚪",
      color: "blue"
    },
    {
      key: "Overdue" as const,
      label: "Overdue",
      count: stats.overdue,
      icon: "⚠️",
      color: "red"
    }
  ];

  return (
    <div className="filter-buttons-container">
      <div className="filter-buttons">
        {filterItems.map((item) => (
          <button
            key={item.key}
            className={`filter-button filter-button--${item.color} ${
              activeFilter === item.key ? 'filter-button--active' : ''
            }`}
            onClick={() => onSetFilter(item.key)}
          >
            <div className="filter-button__icon">
              {item.icon}
            </div>
            <div className="filter-button__content">
              <div className="filter-button__count">{item.count}</div>
              <div className="filter-button__label">{item.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;