"use client";

import { motion } from "framer-motion";
import { type Plant } from "@/data/plants";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function PlantSeasonality({ plant }: { plant: Plant }) {
  const seasonality = plant.seasonality;

  const isActiveMonth = (months: number[], monthNum: number) => {
    return months.includes(monthNum);
  };

  return (
    <section id="seasonality" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-serif font-bold text-black dark:text-white mb-12">
            Seasonality
          </h2>

          <div className="space-y-12">
            {[
              { label: "Sowing", months: seasonality.sowing, color: "bg-blue-500" },
              {
                label: "Flowering",
                months: seasonality.flowering,
                color: "bg-purple-500",
              },
              {
                label: "Harvest",
                months: seasonality.harvest,
                color: "bg-green-500",
              },
            ].map((season, i) => (
              <motion.div
                key={season.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  {season.label}
                </h3>

                <div className="grid grid-cols-12 gap-2">
                  {monthNames.map((month, monthNum) => (
                    <motion.div
                      key={month}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: monthNum * 0.05, duration: 0.4 }}
                      className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-colors ${
                        isActiveMonth(season.months, monthNum + 1)
                          ? `${season.color} text-white`
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500"
                      }`}
                    >
                      {month}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
