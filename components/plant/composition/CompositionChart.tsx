"use client";

import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function CompositionChart({
  plant,
  activeIndex,
  onSelect,
}: {
  plant: Plant;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const data = plant.composition ?? [];
  const cx = 150;
  const cy = 150;
  const radius = 105;

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full">
      <circle cx={cx} cy={cy} r="38" fill="none" stroke="currentColor" strokeOpacity="0.15" />
      <circle cx={cx} cy={cy} r="4" fill="currentColor" />

      {data.map((item, index) => {
        const angle = (index / Math.max(data.length, 1)) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const size = Math.max(8, Math.min(28, Math.sqrt(Math.max(item.relativeValue ?? 1, 1)) * 2));

        return (
          <g key={`${item.compound}-${index}`} onClick={() => onSelect(index)} className="cursor-pointer">
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeOpacity="0.12" />
            <motion.circle
              cx={x}
              cy={y}
              r={size}
              initial={{ scale: 0 }}
              whileInView={{ scale: index === activeIndex ? 1.12 : 1 }}
              animate={{ scale: index === activeIndex ? 1.12 : 1 }}
              className="fill-background stroke-current"
              strokeWidth={index === activeIndex ? 2.5 : 1.2}
            />
            <text
              x={x}
              y={y + size + 14}
              textAnchor="middle"
              className="fill-current font-mono text-[8px]"
            >
              {item.compound.slice(0, 12)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
