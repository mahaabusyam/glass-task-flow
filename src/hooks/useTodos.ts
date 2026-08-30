import { useState, useEffect, useCallback } from "react";

export type Priority = "high" | "medium" | "low";
export type Category = "personal" | "work" | "study" | "shopping";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  dueDate: string | null;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "todoapp_todos";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export type FilterTab = "all" | "active" | "completed";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback(
    (
      data: Omit<Todo, "id" | "createdAt" | "completed">,
    ) => {
      const newTodo: Todo = {
        ...data,
        id: generateId(),
        completed: false,
        createdAt: Date.now(),
      };
      setTodos((prev) => [newTodo, ...prev]);
    },
    [],
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    },
    [],
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  }, []);

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    percentage:
      todos.length === 0
        ? 0
        : Math.round(
            (todos.filter((t) => t.completed).length / todos.length) * 100,
          ),
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    stats,
  };
}
