"use client";

import { Leaf } from "@/components/Leaf";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantTaxonomy({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  const rows = [
    ["Kingdom", plant.taxonomy.kingdom],
    ["Phylum", plant.taxonomy.phylum],
    ["Class", plant.taxonomy.class],
    ["Order", plant.taxonomy.order],
    ["Family", plant.taxonomy.family],
    ["Genus", plant.taxonomy.genus],
    ["Species", plant.taxonomy.species],
  ];

  return (
    <section id="taxonomy" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.taxonomy")}</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">The classification.</h2>
            <Leaf className="mt-10 h-20 w-20 text-leaf/40" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            {rows.map(([level, value], index) => (
              <div key={level} className={`grid grid-cols-[120px_1fr] gap-4 px-5 py-4 ${index ? "border-t border-border" : ""}`}>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{level}</span>
                <span className="font-serif text-lg italic">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
