"use client";

import { motion } from "framer-motion";
import { type Plant, useCategories } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

export function PlantUses({ plant }: { plant: Plant }) {
  const { lang } = useLanguage();
  const useIcons: Record<string, string> = {
    culinary: "🍳",
    medicinal: "💊",
    cultural: "🎭",
    industrial: "🏭",
    ecological: "🌱",
  };

  return (
    <section id="uses" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-12">
            Uses & Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCategories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{useIcons[category]}</span>
                  <h3 className="text-xl font-semibold text-black dark:text-white capitalize">
                    {category}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {plant.uses[category].map((use, j) => (
                    <li key={j} className="text-sm text-gray-700 dark:text-gray-300">
                      • {use[lang] ?? use.en}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
