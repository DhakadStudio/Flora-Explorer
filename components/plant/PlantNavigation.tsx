"use client";

import Link from "next/link";
import { type Plant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PlantNavigation({
  plant,
  prev,
  next,
}: {
  plant: Plant;
  prev?: Plant;
  next?: Plant;
}) {
  const { lang } = useLanguage();

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Back button */}
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            ← Home
          </Link>

          {/* Plant name */}
          <h1 className="text-lg font-serif font-bold text-black dark:text-white">
            {plant.names[lang] ?? plant.names.en}
          </h1>

          {/* Next/Prev */}
          <div className="flex gap-2">
            {prev && (
              <Link
                href={`/plant/${prev.slug}`}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                title={`Previous: ${prev.names[lang] ?? prev.names.en}`}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
            )}
            {next && (
              <Link
                href={`/plant/${next.slug}`}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
                title={`Next: ${next.names[lang] ?? next.names.en}`}
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
