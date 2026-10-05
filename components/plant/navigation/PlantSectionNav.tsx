"use client";

import { type Plant } from "@/data/plants";

export function PlantSectionNav({ plant }: { plant: Plant }) {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "climate", label: "Climate" },
    { id: "geography", label: "Geography" },
    { id: "uses", label: "Uses" },
    { id: "history", label: "History" },
    { id: "composition", label: "Composition" },
    { id: "seasonality", label: "Seasonality" },
    { id: "taxonomy", label: "Taxonomy" },
    { id: "related", label: "Related" },
  ];

  return (
    <div className="sticky top-16 z-10 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 border-b-2 border-transparent hover:border-green-600 dark:hover:border-green-400 transition-all whitespace-nowrap"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
