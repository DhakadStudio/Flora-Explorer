"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";

export function PlantFacts({ plant }: { plant: Plant }) {
  return (
    <section id="facts" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-8">
            Interesting Facts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plant.facts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-l-4 border-green-500 dark:border-green-400"
              >
                <p className="text-gray-700 dark:text-gray-300">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
