"use client";

import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { PlantAppearance } from "./PlantAppearance";
import { PlantHabitat } from "./PlantHabitat";
import { PlantParts } from "./PlantParts";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantOverview({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <section id="overview" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.overview")}</p>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight md:text-6xl">
              A living profile.
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="space-y-12"
          >
            <p className="max-w-3xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
              {plant.description}
            </p>
            <PlantAppearance plant={plant} />
            <PlantHabitat plant={plant} />
            <PlantParts plant={plant} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
