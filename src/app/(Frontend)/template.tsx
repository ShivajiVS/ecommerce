"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{
        type: "spring",
        duration: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
}
