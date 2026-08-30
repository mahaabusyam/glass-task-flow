import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Todo, Priority, Category } from "@/hooks/useTodos";
import { Loader2 } from "lucide-react";

interface AddTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Todo, "id" | "createdAt" | "completed">) => void;
  editingTodo?: Todo | null;
}

const PRIORITIES: { value: Priority; label: string; icon: string }[] = [
  { value: "high", label: "عالية", icon: "🔴" },
  { value: "medium", label: "متوسطة", icon: "🟡" },
  { value: "low", label: "منخفضة", icon: "🟢" },
];

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: "personal", label: "شخصي", icon: "👤" },
  { value: "work", label: "عمل", icon: "💼" },
  { value: "study", label: "دراسة", icon: "📚" },
  { value: "shopping", label: "تسوق", icon: "🛒" },
];

export function AddTodoDialog({
  open,
  onOpenChange,
  onSave,
  editingTodo,
}: AddTodoDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("personal");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setPriority(editingTodo.priority);
      setCategory(editingTodo.category);
      setDueDate(editingTodo.dueDate ?? "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("personal");
      setDueDate("");
    }
  }, [editingTodo, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    // Small delay for animation feel
    await new Promise((r) => setTimeout(r, 200));
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate || null,
    });
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass sm:max-w-[480px] rounded-2xl border-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-bold text-foreground">
            {editingTodo ? "تعديل المهمة" : "إضافة مهمة جديدة"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="todo-title" className="text-sm font-medium text-foreground">
              عنوان المهمة *
            </Label>
            <Input
              id="todo-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: إنهاء تقرير المشروع"
              className="glass-sm border-0 bg-background/50"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="todo-desc" className="text-sm font-medium text-foreground">
              الوصف
            </Label>
            <Textarea
              id="todo-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="تفاصيل إضافية للمهمة..."
              className="glass-sm border-0 bg-background/50 min-h-[80px] resize-none"
              rows={3}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">الأولوية</Label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    priority === p.value
                      ? `priority-${p.value} ring-2 ring-primary/30`
                      : "glass-sm hover:bg-muted"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">التصنيف</Label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    category === c.value
                      ? `cat-${c.value} ring-2 ring-primary/30`
                      : "glass-sm hover:bg-muted"
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="todo-date" className="text-sm font-medium text-foreground">
              تاريخ الاستحقاق
            </Label>
            <Input
              id="todo-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="glass-sm border-0 bg-background/50"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!title.trim() || saving}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {editingTodo ? "حفظ التعديلات" : "إضافة المهمة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
