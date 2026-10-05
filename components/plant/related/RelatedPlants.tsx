"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";
import { PlantImage } from "@/components/plant-image";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function RelatedPlants({ plant }: { plant: Plant }) {
  const { lang, t } = useLanguage();

  const related = plant.related
    .map((slug) => getPlant(slug))
    .filter((item): item is Plant => Boolean(item));

  return (
    <section id="related" className="scroll-mt-32 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.related")}</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">Continue exploring.</h2>

        {!related.length ? (
          <p className="mt-10 text-muted-foreground">No related plants documented.</p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/plant/${item.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card/30"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <PlantImage
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-serif text-2xl">{item.names[lang] ?? item.names.en}</h3>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                        {item.scientificName}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
