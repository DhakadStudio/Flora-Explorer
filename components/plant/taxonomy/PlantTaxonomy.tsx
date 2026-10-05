"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";

export function PlantTaxonomy({ plant }: { plant: Plant }) {
  const taxonomy = plant.taxonomy;
  const ranks = [
    { label: "Kingdom", value: taxonomy.kingdom },
    { label: "Phylum", value: taxonomy.phylum },
    { label: "Class", value: taxonomy.class },
    { label: "Order", value: taxonomy.order },
    { label: "Family", value: taxonomy.family },
    { label: "Genus", value: taxonomy.genus },
    { label: "Species", value: taxonomy.species },
  ];

  return (
    <section id="taxonomy" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-8">
            Scientific Classification
          </h2>

          <div className="space-y-3">
            {ranks.map((rank, i) => (
              <motion.div
                key={rank.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="min-w-24">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {rank.label}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-mono text-black dark:text-white">
                    {rank.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
