"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";
import { Globe } from "@/components/Globe";

export function PlantGeography({ plant }: { plant: Plant }) {
  const geography = plant.geography;

  return (
    <section id="geography" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-8">
            Geography & Distribution
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Globe */}
            <div className="flex items-center justify-center h-[400px]">
              <Globe
                center={geography.nativeCenter}
                highlightCountries={geography.countries.map((c) => c.iso)}
              />
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  Native Region
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {geography.nativeRegion}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Top Producers
                </h3>
                <div className="space-y-2">
                  {geography.topProducers.map((producer, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">
                        {producer.country}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 dark:bg-green-500"
                            style={{ width: `${producer.sharePercent}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12 text-right">
                          {producer.sharePercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Cultivation Status
                </h3>
                <div className="space-y-2">
                  {geography.countries.slice(0, 5).map((country, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded"
                    >
                      <span className="font-medium text-black dark:text-white">
                        {country.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                        {country.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
