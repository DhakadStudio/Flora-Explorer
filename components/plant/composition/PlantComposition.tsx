"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";

export function PlantComposition({ plant }: { plant: Plant }) {
  const maxValue = Math.max(...plant.composition.map((c) => c.relativeValue));

  return (
    <section id="composition" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-8">
            Chemical Composition
          </h2>

          <div className="space-y-6">
            {plant.composition.map((compound, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">
                      {compound.compound}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Part: {compound.partUsed}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-green-600 dark:text-green-400">
                    {compound.relativeValue}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(compound.relativeValue / maxValue) * 100}%` }}
                    transition={{ delay: i * 0.05 + 0.3, duration: 0.8 }}
                    className="h-full bg-green-500 dark:bg-green-400"
                  />
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {compound.benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
