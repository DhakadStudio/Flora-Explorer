"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function IdealConditions({ plant }: { plant: Plant }) {
  const { t } = useLanguage();
  const g = plant.growth;

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-leaf">
        {t("climate.ideal") || "Ideal conditions"}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div><span className="text-xs text-muted-foreground">Temperature</span><p className="mt-1 font-mono">{g.tempC[0]}–{g.tempC[1]}°C</p></div>
        <div><span className="text-xs text-muted-foreground">Rainfall</span><p className="mt-1 font-mono">{g.rainfallMm[0]}–{g.rainfallMm[1]} mm</p></div>
        <div><span className="text-xs text-muted-foreground">Soil pH</span><p className="mt-1 font-mono">{g.soilPh[0]}–{g.soilPh[1]}</p></div>
        <div><span className="text-xs text-muted-foreground">Sunlight</span><p className="mt-1 font-mono">{g.sunlightHours[0]}–{g.sunlightHours[1]} h/day</p></div>
      </div>
    </div>
  );
}
