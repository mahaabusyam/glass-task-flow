import { motion } from "framer-motion";
import { Check, Pencil, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Todo, Priority, Category } from "@/hooks/useTodos";

const CATEGORY_LABELS: Record<Category, string> = {
  personal: "شخصي",
  work: "عمل",
  study: "دراسة",
  shopping: "تسوق",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  high: "عالية",
  medium: "متوسطة",
  low: "منخفضة",
};

function formatDueDate(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diff < 0) return `متأخر ${Math.abs(diff)} يوم`;
  if (diff === 0) return "اليوم";
  if (diff === 1) return "غداً";
  if (diff <= 7) return `بعد ${diff} أيام`;
  return d.toLocaleDateString("ar-SA", { month: "short", day: "numeric" });
}

function isOverdue(date: string, completed: boolean): boolean {
  if (completed) return false;
  return new Date(date) < new Date(new Date().toDateString());
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const overdue = todo.dueDate ? isOverdue(todo.dueDate, todo.completed) : false;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`glass group relative flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          todo.completed
            ? "border-primary bg-primary text-primary-foreground animate-check"
            : "border-border hover:border-primary hover:bg-primary/10"
        }`}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className={`text-base font-semibold leading-tight transition-all duration-300 ${
                todo.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`mt-1.5 text-sm leading-relaxed transition-all duration-300 ${
                  todo.completed
                    ? "text-muted-foreground/60 line-through"
                    : "text-muted-foreground"
                }`}
              >
                {todo.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => onEdit(todo)}
              aria-label="Edit task"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete task"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Meta badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium priority-${todo.priority}`}
          >
            {PRIORITY_LABELS[todo.priority]}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium cat-${todo.category}`}
          >
            {CATEGORY_LABELS[todo.category]}
          </span>
          {todo.dueDate && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                overdue
                  ? "priority-high"
                  : "text-muted-foreground bg-muted border border-border"
              }`}
            >
              <Calendar className="h-3 w-3" />
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
