import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useTodos, type Todo, type FilterTab, type Category } from "@/hooks/useTodos";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TodoItem } from "@/components/TodoItem";
import { AddTodoDialog } from "@/components/AddTodoDialog";
import { Button } from "@/components/ui/button";
import {
  Plus,
  LogOut,
  ListChecks,
  CheckCircle2,
  Clock,
  BarChart3,
  ListFilter,
} from "lucide-react";
import { useNavigate } from "react-router";

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "active", label: "قيد التنفيذ" },
  { value: "completed", label: "المكتملة" },
];

const CATEGORY_FILTERS: { value: Category | "all"; label: string; icon: string }[] = [
  { value: "all", label: "الكل", icon: "📋" },
  { value: "personal", label: "شخصي", icon: "👤" },
  { value: "work", label: "عمل", icon: "💼" },
  { value: "study", label: "دراسة", icon: "📚" },
  { value: "shopping", label: "تسوق", icon: "🛒" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, stats } = useTodos();

  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const filteredTodos = useMemo(() => {
    let result = todos;

    // Filter by tab
    if (filterTab === "active") result = result.filter((t) => !t.completed);
    if (filterTab === "completed") result = result.filter((t) => t.completed);

    // Filter by category
    if (categoryFilter !== "all")
      result = result.filter((t) => t.category === categoryFilter);

    // Sort: incomplete first, then by creation date (newest first)
    return result.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
  }, [todos, filterTab, categoryFilter]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openAddDialog = () => {
    setEditingTodo(null);
    setDialogOpen(true);
  };

  const openEditDialog = (todo: Todo) => {
    setEditingTodo(todo);
    setDialogOpen(true);
  };

  const handleSave = (data: Omit<Todo, "id" | "createdAt" | "completed">) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, data);
    } else {
      addTodo(data);
    }
  };

  return (
    <div className="bg-mesh min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="glass flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
                {user?.name?.charAt(0)?.toUpperCase() || "T"}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  مرحباً{user?.name ? `، ${user.name}` : ""}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {stats.active > 0
                    ? `لديك ${stats.active} مهمة${stats.active > 1 ? "" : ""} نشطة`
                    : stats.total === 0
                      ? "ابدأ بإضافة مهمتك الأولى"
                      : "أحسنت! أنجزت جميع مهامك 🎉"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="glass-sm text-muted-foreground hover:text-destructive"
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            {
              icon: ListChecks,
              label: "إجمالي المهام",
              value: stats.total,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              icon: Clock,
              label: "قيد التنفيذ",
              value: stats.active,
              color: "text-warning",
              bg: "bg-warning/10",
            },
            {
              icon: CheckCircle2,
              label: "المكتملة",
              value: stats.completed,
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              icon: BarChart3,
              label: "نسبة الإنجاز",
              value: `${stats.percentage}%`,
              color: "text-info",
              bg: "bg-info/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
              className="glass rounded-2xl p-4 sm:p-5"
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Completion Bar */}
        {stats.total > 0 && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass mb-8 rounded-2xl p-4"
            style={{ transformOrigin: "left" }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">تقدم الإنجاز</span>
              <span className="text-sm font-bold text-primary">{stats.percentage}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-info"
              />
            </div>
          </motion.div>
        )}

        {/* Filters & Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-4"
        >
          {/* Tabs + Add */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="glass flex items-center gap-1 rounded-2xl p-1">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilterTab(tab.value)}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filterTab === tab.value
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                  {tab.value !== "all" && (
                    <span className="text-xs opacity-70">
                      ({tab.value === "active" ? stats.active : stats.completed})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <Button onClick={openAddDialog} className="rounded-xl px-5 shadow-md shadow-primary/20">
              <Plus className="ml-2 h-4 w-4" />
              مهمة جديدة
            </Button>
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  categoryFilter === cat.value
                    ? cat.value === "all"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : `cat-${cat.value} ring-2 ring-primary/20`
                    : "glass-sm text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Task List */}
        <div className="mt-6 space-y-3 pb-24">
          <AnimatePresence mode="popLayout">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onEdit={openEditDialog}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <ListFilter className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {stats.total === 0 ? "لا توجد مهام بعد" : "لا توجد نتائج"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stats.total === 0
                    ? "اضغط على \"مهمة جديدة\" للبدء"
                    : "جرّب تغيير الفلتر أو التصنيف"}
                </p>
                {stats.total === 0 && (
                  <Button onClick={openAddDialog} className="mt-6 rounded-xl">
                    <Plus className="ml-2 h-4 w-4" />
                    أضف مهمتك الأولى
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Add Button (mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40"
        >
          <Button
            onClick={openAddDialog}
            size="icon"
            className="h-14 w-14 rounded-2xl shadow-xl shadow-primary/30"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Add/Edit Dialog */}
      <AddTodoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        editingTodo={editingTodo}
      />
    </div>
  );
}
