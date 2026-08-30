import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-mesh min-h-screen flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="glass rounded-3xl p-12 text-center max-w-md"
        >
          <p className="text-7xl font-extrabold bg-gradient-to-br from-primary to-info bg-clip-text text-transparent">
            404
          </p>
          <h1 className="mt-4 text-xl font-bold text-foreground">
            الصفحة غير موجودة
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            يبدو أن هذه الصفحة قد نُقلت أو حُذفت.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="mt-8 rounded-xl px-6"
          >
            العودة للرئيسية
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
