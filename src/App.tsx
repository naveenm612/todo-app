import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useTodos } from "./hooks/useTodos";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import SearchBar from "./components/SearchBar/SearchBar";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import "./styles.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import FilterButtons from "./components/FilterButtons/FilterButtons";

type FilterType = "All" | "Active" | "Completed" | "Overdue";

const AppContent = () => {
  const { darkMode, toggleTheme } = useTheme();
  const {
    todos, addTodo, toggleComplete, deleteTodo,
    setFilter, setCategoryFilter, setSearchTerm
  } = useTodos();

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setFilter(filter);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "n") {
        document.querySelector<HTMLInputElement>(".form input")?.focus();
      }
      if (e.key.toLowerCase() === "d" && e.ctrlKey) {
        toggleTheme();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggleTheme]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header onToggleTheme={toggleTheme} />
      <FilterButtons
        onSetFilter={handleFilterChange}
        activeFilter={activeFilter}
        stats={{
          total: todos.length,
          completed: todos.filter(t => t.completed).length,
          active: todos.filter(t => !t.completed).length,
          overdue: todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
        }}
      />
      <div className="main-content">
        <AddTodoForm onAdd={addTodo} />
        <SearchBar onSearch={setSearchTerm} />
        <CategoryFilter
          todos={todos}
          onFilter={setCategoryFilter}
        />

        <div className="todos-container">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos found. Add one to get started!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleComplete(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
