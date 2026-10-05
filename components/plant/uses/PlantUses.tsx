"use client";

import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;
const categories = ["culinary", "medicinal", "cultural", "industrial", "ecological"] as const;

export function PlantUses({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <section id="uses" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.uses")}</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl">Many lives for one plant.</h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {categories.map((category) => {
            const items = plant.uses?.[category] ?? [];
            if (!items.length) return null;

            return (
              <motion.article
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-background p-6 md:p-8"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-leaf">
                  {t(`uses.${category}`) || category}
                </p>
                <ul className="mt-5 space-y-3">
                  {items.map((item, index) => (
                    <li key={index} className="text-sm leading-6 text-muted-foreground">
                      <span className="mr-2 text-leaf">•</span>{item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
