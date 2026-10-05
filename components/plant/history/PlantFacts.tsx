"use client";

import { motion } from "framer-motion";
import { Leaf } from "@/components/Leaf";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantFacts({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <section id="facts" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.facts")}</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">Field notes.</h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plant.facts.map((fact, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-2xl border border-border bg-card/40 p-6"
            >
              <Leaf className="h-5 w-5 text-leaf" />
              <p className="mt-5 text-sm leading-7">{fact}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
