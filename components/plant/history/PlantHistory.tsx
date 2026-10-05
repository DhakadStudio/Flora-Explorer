"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";

export function PlantHistory({ plant }: { plant: Plant }) {
  return (
    <section id="history" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-12">
            History & Timeline
          </h2>

          <div className="space-y-8">
            {plant.history.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {event.era}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {event.event}
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
