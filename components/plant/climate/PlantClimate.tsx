"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";

export function PlantClimate({ plant }: { plant: Plant }) {
  const growth = plant.growth;

  return (
    <section id="climate" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-8">
            Climate & Growth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Climate Type
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.climateType}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Temperature Range
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.tempC[0]}°C - {growth.tempC[1]}°C
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Rainfall
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.rainfallMm[0]} - {growth.rainfallMm[1]} mm
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Water Need
                </h3>
                <p className="text-lg font-medium text-black dark:text-white capitalize">
                  {growth.waterNeed}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Sunlight
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.sunlight}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Sunlight Hours
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.sunlightHours[0]} - {growth.sunlightHours[1]} hours/day
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Soil Type
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.soil}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Soil pH
                </h3>
                <p className="text-lg font-medium text-black dark:text-white">
                  {growth.soilPh[0]} - {growth.soilPh[1]}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
