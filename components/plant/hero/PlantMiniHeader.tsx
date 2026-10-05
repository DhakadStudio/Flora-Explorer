"use client";

import { motion } from "framer-motion";
import { Leaf } from "@/components/Leaf";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantMiniHeader({ plant }: { plant: Plant }) {
  const { lang } = useLanguage();
  const name = plant.names[lang] ?? plant.names.en;

  return (
    <div className="sticky top-16 z-20 border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-10">
        <div className="flex items-center gap-3">
          <Leaf className="h-5 w-5 text-leaf" />
          <span className="font-serif text-lg font-medium">{name}</span>
        </div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground sm:block">
          {plant.scientificName}
        </span>
      </div>
    </div>
  );
}
