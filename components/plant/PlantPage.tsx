"use client";

import { useMemo } from "react";
import { getAdjacentPlants, getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { PlantPageShell } from "./PlantPageShell";
import { PlantNavigation } from "./PlantNavigation";
import { PlantHero } from "./hero/PlantHero";
import { PlantSectionNav } from "./navigation/PlantSectionNav";
import { PlantOverview } from "./overview/PlantOverview";
import { PlantClimate } from "./climate/PlantClimate";
import { PlantGeography } from "./geography/PlantGeography";
import { PlantUses } from "./uses/PlantUses";
import { PlantHistory } from "./history/PlantHistory";
import { PlantFacts } from "./history/PlantFacts";
import { PlantComposition } from "./composition/PlantComposition";
import { PlantSeasonality } from "./seasonality/PlantSeasonality";
import { PlantTaxonomy } from "./taxonomy/PlantTaxonomy";
import { RelatedPlants } from "./related/RelatedPlants";

export function PlantPage({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const plant = useMemo(() => getPlant(slug), [slug]);

  if (!plant) return null;

  const { prev, next } = getAdjacentPlants(plant.slug);
  const name = plant.names[lang] ?? plant.names.en;

  return (
    <PlantPageShell>
      <PlantNavigation plant={plant} prev={prev} next={next} />

      <main id="main-content" aria-label={`${name} plant profile`}>
        <PlantHero plant={plant} />
        <PlantSectionNav plant={plant} />

        <div className="space-y-0">
          <PlantOverview plant={plant} />
          <PlantClimate plant={plant} />
          <PlantGeography plant={plant} />
          <PlantUses plant={plant} />
          <PlantHistory plant={plant} />
          <PlantFacts plant={plant} />
          <PlantComposition plant={plant} />
          <PlantSeasonality plant={plant} />
          <PlantTaxonomy plant={plant} />
          <RelatedPlants plant={plant} />
        </div>
      </main>
    </PlantPageShell>
  );
}
