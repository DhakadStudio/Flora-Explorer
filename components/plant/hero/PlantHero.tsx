"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Leaf } from "@/components/Leaf";
import { PlantImage } from "@/components/plant-image";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { PlantHeroBackground } from "./PlantHeroBackground";
import { PlantMiniHeader } from "./PlantMiniHeader";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantHero({ plant }: { plant: Plant }) {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.2], ["0%", reduce ? "0%" : "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.05]);

  const name = plant.names[lang] ?? plant.names.en;

  return (
    <>
      <section id="hero" className="relative -mt-16 flex min-h-svh overflow-hidden pt-16">
        <PlantHeroBackground plant={plant} />

        <motion.div
          style={{ y: contentY, opacity }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-24 md:px-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="h-px w-8 bg-leaf" />
            {t("hero.eyebrow")}
          </motion.p>

          <h1 className="max-w-6xl font-serif text-[clamp(3.25rem,11vw,10rem)] font-medium leading-[0.88] tracking-[-0.04em]">
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="block"
            >
              {name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block italic text-leaf-ink"
            >
              {plant.scientificName}
            </motion.span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-background/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em]">
              {plant.category}
            </span>
            {plant.geography.topProducers?.[0] && (
              <span className="rounded-full border border-leaf/30 bg-leaf/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-leaf-ink">
                {plant.geography.topProducers[0].country}
              </span>
            )}
          </div>

          <p className="mt-10 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            {plant.description}
          </p>

          <a
            href="#overview"
            className="mt-12 inline-flex w-fit flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground"
          >
            {t("hero.scroll")}
            <span className="h-10 w-px overflow-hidden bg-border">
              <span className="block h-1/2 w-full animate-scroll-cue bg-leaf" />
            </span>
            <ArrowDown className="sr-only" />
          </a>
        </motion.div>
      </section>

      <PlantMiniHeader plant={plant} />
    </>
  );
}
