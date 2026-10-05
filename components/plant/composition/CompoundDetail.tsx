"use client";

import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";

type Plant = NonNullable<ReturnType<typeof getPlant>>;
type Compound = Plant["composition"][number];

export function CompoundDetail({ compound }: { compound?: Compound }) {
  if (!compound) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Select a compound to inspect it.
      </div>
    );
  }

  return (
    <motion.div
      key={compound.compound}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card/50 p-6"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-leaf">Selected compound</p>
      <h3 className="mt-3 font-serif text-3xl">{compound.compound}</h3>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-muted-foreground">Relative value</dt>
          <dd className="mt-1 font-mono">{compound.relativeValue}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Part used</dt>
          <dd className="mt-1 font-mono">{compound.partUsed}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Benefit</dt>
          <dd className="mt-1 text-sm">{compound.benefit}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
