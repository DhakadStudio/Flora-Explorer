"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantHabitat({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <article id="habitat" className="scroll-mt-32 border-t border-border/50 pt-8">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{t("sec.habitat")}</p>
      <p className="mt-4 max-w-3xl text-base leading-7">{plant.habitat}</p>
    </article>
  );
}
