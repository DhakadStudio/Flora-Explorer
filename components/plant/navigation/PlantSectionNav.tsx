"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { PlantScrollProgress } from "./PlantScrollProgress";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

const sections = [
  ["overview", "sec.overview"],
  ["climate", "sec.climate"],
  ["geography", "sec.globe"],
  ["uses", "sec.uses"],
  ["history", "sec.history"],
  ["facts", "sec.facts"],
  ["composition", "sec.composition"],
  ["seasonality", "sec.seasonality"],
  ["taxonomy", "sec.taxonomy"],
  ["related", "sec.related"],
] as const;

export function PlantSectionNav({ plant: _plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <>
      <PlantScrollProgress />
      <nav
        aria-label="Plant sections"
        className="sticky top-[7.5rem] z-10 mx-auto -mb-1 w-full max-w-7xl px-5 md:px-10"
      >
        <div className="overflow-x-auto border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex min-w-max gap-1 py-2">
            {sections.map(([id, key]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(key) || id}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
