import { useState, useEffect, useCallback, useMemo } from "react";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate?: string;
  description?: string;
};

const STORAGE_KEY = "todos";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState<"All" | "Active" | "Completed" | "Overdue">("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);
  
  const editTodo = useCallback(
    (id: string, updatedFields: Partial<Omit<Todo, "id" | "completed">>) => {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, ...updatedFields } : t
        )
      );
    },
    []
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTodos = useMemo(() => {
     const now = new Date();
    return todos.filter((t) => {
      const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || t.category === categoryFilter;
      const matchesStatus =
        filter === "All" ||
        (filter === "Active" && !t.completed) ||
        (filter === "Completed" && t.completed) ||
        (filter === "Overdue" &&
          !t.completed &&
          t.dueDate &&
          new Date(t.dueDate) < now);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [todos, filter, categoryFilter, searchTerm]);

  return {
    todos: filteredTodos,
    addTodo,
    toggleComplete,
    editTodo,
    deleteTodo,
    setFilter,
    setCategoryFilter,
    setSearchTerm,
  };
};
