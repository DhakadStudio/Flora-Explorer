"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

export function PlantOverview({ plant }: { plant: Plant }) {
  const { lang } = useLanguage();

  return (
    <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-8">
            Overview
          </h2>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                Description
              </h3>
              <p className="leading-relaxed">{plant.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                Habitat
              </h3>
              <p className="leading-relaxed">{plant.habitat}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
