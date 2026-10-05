"use client";

import { useState } from "react";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { CompositionChart } from "./CompositionChart";
import { CompoundDetail } from "./CompoundDetail";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantComposition({ plant }: { plant: Plant }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="composition" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.composition")}</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">Inside the plant.</h2>

        {!plant.composition?.length ? (
          <p className="mt-10 text-muted-foreground">No composition data documented.</p>
        ) : (
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div className="mx-auto aspect-square w-full max-w-[560px]">
              <CompositionChart
                plant={plant}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            </div>
            <CompoundDetail compound={plant.composition[activeIndex]} />
          </div>
        )}
      </div>
    </section>
  );
}
