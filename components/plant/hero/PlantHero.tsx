"use client";

import { motion } from "framer-motion";
import { PlantImage } from "@/components/plant-image";
import { type Plant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

export function PlantHero({ plant }: { plant: Plant }) {
  const { lang } = useLanguage();
  const name = plant.names[lang] ?? plant.names.en;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px]">
            <PlantImage
              src={plant.image}
              alt={plant.imageAlt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-black dark:text-white mb-2">
                {name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 italic font-mono">
                {plant.scientificName}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                {plant.category}
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                {plant.family}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {plant.summary[lang] ?? plant.summary.en}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {plant.appearance}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
