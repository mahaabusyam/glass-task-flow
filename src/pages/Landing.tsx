import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  CheckCircle2,
  ListTodo,
  Tags,
  Moon,
  Smartphone,
  Sparkles,
  ArrowRight,
  Zap,
  CalendarCheck,
  BarChart3,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
} as const;

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const FEATURES = [
  {
    icon: ListTodo,
    title: "إدارة ذكية",
    desc: "أضف وتعديل وحذف المهام بسهولة مع واجهة بديهية وسلسة",
  },
  {
    icon: Tags,
    title: "تصنيفات مرنة",
    desc: "صنّف مهامك عبر أقسام: شخصي، عمل، دراسة، تسوق",
  },
  {
    icon: BarChart3,
    title: "إحصائيات فورية",
    desc: "تابع نسبة إنجازك اليومية ومراقبة تقدمك لحظياً",
  },
  {
    icon: Moon,
    title: "وضع ليلي ونهاري",
    desc: "تبديل سلس بين الوضع الداكن والفاتح حسب رغبتك",
  },
  {
    icon: CalendarCheck,
    title: "تواريخ واستحقاقات",
    desc: "حدد مواعيد الاستحقاق واحصل على تنبيهات للمهام المتأخرة",
  },
  {
    icon: Smartphone,
    title: "تصميم متجاوب",
    desc: "يعمل بكفاءة عالية على جميع الأجهزة بتصميم عصري",
  },
];

const STATS = [
  { icon: Zap, value: "فوري", label: "حفظ محلي" },
  { icon: Sparkles, value: "سليم", label: "تأثيرات بصرية" },
  { icon: CheckCircle2, value: "مجاني", label: "لا حاجة للتسجيل" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-mesh min-h-screen">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="glass flex items-center justify-between rounded-2xl px-6 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                ✓
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                TaskFlow
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                onClick={() => navigate("/auth")}
                className="rounded-xl px-5"
              >
                ابدأ الآن
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-info/8 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <div className="glass-sm mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              تجربة إدارة مهام عصرية بالكامل
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl"
          >
            نظّم مهامك
            <br />
            <span className="bg-gradient-to-l from-primary via-info to-success bg-clip-text text-transparent">
              بأناقة وذكاء
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            تطبيق قائمة مهام احترافي بتصميم Glassmorphism عصري.
            <br className="hidden sm:block" />
            أضف مهامك، صنّفها، وتتبع إنجازك بسهولة تامة.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="rounded-2xl px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25"
            >
              ابدأ مجاناً
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth")}
              className="glass-sm rounded-2xl px-8 py-6 text-base font-semibold"
            >
              تصفّح المميزات
            </Button>
          </motion.div>

          {/* Stats chips */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass-sm flex items-center gap-3 rounded-2xl px-5 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              كل ما تحتاجه في مكان واحد
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              مميزات متقدمة مصممة لتجربة إدارة مهام سلسة وممتعة
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="glass glass-hover group rounded-2xl p-7 transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-info/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                جاهز لتنظيم مهامك؟
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                ابدأ الآن واحصل على تجربة إدارة مهام لا مثيل لها. مجاناً تماماً
                ولا حاجة للتسجيل.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="mt-8 rounded-2xl px-10 py-6 text-base font-semibold shadow-lg shadow-primary/25"
              >
                ابدأ الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          صُنع بـ ❤️ بواسطة{" "}
          <a
            href="https://freebuff.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            freebuff.com
          </a>
        </p>
      </footer>
    </div>
  );
}
