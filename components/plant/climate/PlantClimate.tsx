"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { ClimateDial } from "./ClimateDial";
import { IdealConditions } from "./IdealConditions";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantClimate({ plant }: { plant: Plant }) {
  const { t } = useLanguage();
  const g = plant.growth;

  const midpoint = (a: number, b: number) => (a + b) / 2;
  const normalized = (a: number, b: number, lo: number, hi: number) =>
    Math.max(0, Math.min(1, (midpoint(a, b) - lo) / (hi - lo)));

  return (
    <section id="climate" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.climate") || "Climate"}</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl">Where it thrives.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <ClimateDial label={t("climate.temperature") || "Temperature"} value={`${g.tempC[0]}–${g.tempC[1]}°C`} min={g.tempC[0]} max={g.tempC[1]} unit="°C" progress={normalized(...g.tempC, -10, 50)} />
          <ClimateDial label={t("climate.rainfall") || "Rainfall"} value={`${g.rainfallMm[0]}–${g.rainfallMm[1]} mm`} min={g.rainfallMm[0]} max={g.rainfallMm[1]} unit=" mm" progress={normalized(...g.rainfallMm, 0, 5000)} />
          <ClimateDial label="Soil pH" value={`${g.soilPh[0]}–${g.soilPh[1]}`} min={g.soilPh[0]} max={g.soilPh[1]} progress={normalized(...g.soilPh, 3, 10)} />
          <ClimateDial label="Sunlight" value={`${g.sunlightHours[0]}–${g.sunlightHours[1]} h`} min={g.sunlightHours[0]} max={g.sunlightHours[1]} unit=" h" progress={normalized(...g.sunlightHours, 0, 16)} />
          <ClimateDial label="Water" value={t(`water.${g.waterNeed}`) || g.waterNeed} min={0} max={1} progress={g.waterNeed === "high" ? 1 : g.waterNeed === "medium" ? 0.6 : 0.3} />
        </div>

        <div className="mt-6">
          <IdealConditions plant={plant} />
        </div>
      </div>
    </section>
  );
}
