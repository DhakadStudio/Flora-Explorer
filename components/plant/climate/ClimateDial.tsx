"use client";

import { motion } from "framer-motion";

export function ClimateDial({
  label,
  value,
  min,
  max,
  unit = "",
  progress,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  unit?: string;
  progress: number;
}) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <span className="font-mono text-xs">{value}</span>
      </div>

      <div className="relative mt-8 h-28 overflow-hidden rounded-xl border border-border/60">
        <div className="absolute inset-x-4 bottom-4 h-px bg-border" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: clamped }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-4 left-4 h-px w-[calc(100%-2rem)] origin-left bg-leaf"
        />
        <div
          className="absolute bottom-3 h-3 w-3 -translate-x-1/2 rounded-full bg-leaf"
          style={{ left: `calc(1rem + ${clamped} * (100% - 2rem))` }}
        />
        <div className="absolute bottom-7 left-4 font-mono text-[8px] text-muted-foreground">
          {min}{unit}
        </div>
        <div className="absolute bottom-7 right-4 font-mono text-[8px] text-muted-foreground">
          {max}{unit}
        </div>
      </div>
    </div>
  );
}
