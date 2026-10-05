"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Leaf } from "@/components/Leaf";
import { useLanguage } from "@/components/providers/language-provider";
import { getPlant } from "@/data/plants";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantNavigation({
  plant,
  prev,
  next,
}: {
  plant: Plant;
  prev?: Plant | null;
  next?: Plant | null;
}) {
  const { lang } = useLanguage();
  const name = plant.names[lang] ?? plant.names.en;

  return (
    <header className="relative z-30 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background"
          >
            <Leaf className="h-4 w-4 text-leaf" />
          </motion.span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-base font-medium md:text-lg">{name}</span>
            <span className="hidden truncate font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
              {plant.scientificName}
            </span>
          </span>
        </Link>

        <nav aria-label="Plant navigation" className="flex shrink-0 items-center gap-1">
          {prev ? (
            <Link
              href={`/plant/${prev.slug}`}
              className="group flex h-10 items-center gap-2 rounded-full border border-border px-3 transition-colors hover:border-leaf/50 hover:bg-muted/50 md:px-4"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5" />
              <span className="hidden max-w-24 truncate font-mono text-[10px] uppercase tracking-[0.14em] sm:block">
                {prev.names[lang] ?? prev.names.en}
              </span>
            </Link>
          ) : (
            <span className="h-10 w-10 rounded-full border border-border/40 opacity-40" />
          )}

          {next ? (
            <Link
              href={`/plant/${next.slug}`}
              className="group flex h-10 items-center gap-2 rounded-full border border-border px-3 transition-colors hover:border-leaf/50 hover:bg-muted/50 md:px-4"
            >
              <span className="hidden max-w-24 truncate font-mono text-[10px] uppercase tracking-[0.14em] sm:block">
                {next.names[lang] ?? next.names.en}
              </span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span className="h-10 w-10 rounded-full border border-border/40 opacity-40" />
          )}
        </nav>
      </div>
    </header>
  );
}
