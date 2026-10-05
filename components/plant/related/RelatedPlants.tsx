"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Plant, getPlant } from "@/data/plants";
import { PlantImage } from "@/components/plant-image";
import { useLanguage } from "@/components/providers/language-provider";

export function RelatedPlants({ plant }: { plant: Plant }) {
  const { lang } = useLanguage();
  const relatedPlants = plant.related
    .map((slug) => getPlant(slug))
    .filter(Boolean) as Plant[];

  if (relatedPlants.length === 0) return null;

  return (
    <section id="related" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-12">
            Related Plants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPlants.map((relatedPlant, i) => (
              <motion.div
                key={relatedPlant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link href={`/plant/${relatedPlant.slug}`}>
                  <div className="group cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 transition-transform hover:scale-105">
                    <div className="relative h-64 overflow-hidden">
                      <PlantImage
                        src={relatedPlant.image}
                        alt={relatedPlant.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-serif font-bold text-black dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {relatedPlant.names[lang] ?? relatedPlant.names.en}
                      </h3>
                      <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mt-2">
                        {relatedPlant.scientificName}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 line-clamp-2">
                        {relatedPlant.summary[lang] ?? relatedPlant.summary.en}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
