"use client";

import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function ProducerRanking({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        {t("globe.top") || "Top producers"}
      </p>
      <div className="mt-5 space-y-4">
        {plant.geography.topProducers.map((producer, index) => (
          <div key={`${producer.country}-${index}`}>
            <div className="flex items-center justify-between gap-4 font-mono text-xs">
              <span>{producer.country}</span>
              <span>{producer.sharePercent}%</span>
            </div>
            <div className="mt-2 h-px overflow-hidden bg-border">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: producer.sharePercent / 100 }}
                viewport={{ once: true }}
                className="h-full origin-left bg-leaf"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
