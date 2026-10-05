"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PlantPageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative isolate min-h-screen overflow-x-clip ${className}`}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="grid-lines absolute inset-0" />
      </div>
      {children}
    </motion.div>
  );
}
