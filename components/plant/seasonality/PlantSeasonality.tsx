"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { SeasonalityWheel } from "./SeasonalityWheel";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantSeasonality({ plant }: { plant: Plant }) {
  const { t } = useLanguage();
  const current = new Date().getMonth() + 1;

  return (
    <section id="seasonality" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.seasonality")}</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">A year in motion.</h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_0.7fr]">
          <SeasonalityWheel plant={plant} />

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Current month</p>
            <p className="mt-3 font-serif text-4xl">{current}</p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>Sowing: {plant.seasonality?.sowing?.includes(current) ? "active" : "—"}</p>
              <p>Flowering: {plant.seasonality?.flowering?.includes(current) ? "active" : "—"}</p>
              <p>Harvest: {plant.seasonality?.harvest?.includes(current) ? "active" : "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
