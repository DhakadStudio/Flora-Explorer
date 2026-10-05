"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

const colors = {
  sowing: "stroke-current",
  flowering: "stroke-current opacity-70",
  harvest: "stroke-current opacity-40",
};

export function SeasonalityWheel({ plant }: { plant: Plant }) {
  const { lang } = useLanguage();

  const months = {
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    hi: ["जन","फ़र","मार्च","अप्रै","मई","जून","जुला","अग","सित","अक्टू","नव","दिस"],
    es: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
  } as const;

  const labels = months[lang as keyof typeof months] ?? months.en;
  const cx = 150, cy = 150;

  function point(radius: number, month: number) {
    const angle = ((month - 1) / 12) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  }

  function arcPath(radius: number, month: number) {
    const start = point(radius, month);
    const end = point(radius, month + 0.96);
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <svg viewBox="0 0 300 300" className="h-full w-full">
        {[48, 72, 96].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" />
        ))}

        {Array.from({ length: 12 }).map((_, i) => {
          const p = point(112, i + 1);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-current font-mono text-[7px]">
              {labels[i]}
            </text>
          );
        })}

        {(["sowing", "flowering", "harvest"] as const).map((kind, ring) => {
          const radius = 96 - ring * 24;
          const active = new Set(plant.seasonality?.[kind] ?? []);

          return Array.from({ length: 12 }).map((_, i) => {
            const month = i + 1;
            const activeMonth = active.has(month);
            return (
              <path
                key={`${kind}-${month}`}
                d={arcPath(radius, month)}
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeOpacity={activeMonth ? (kind === "sowing" ? 0.75 : kind === "flowering" ? 0.5 : 0.3) : 0.07}
                strokeLinecap="butt"
              />
            );
          });
        })}

        <circle cx={cx} cy={cy} r="28" fill="none" stroke="currentColor" strokeOpacity="0.15" />
        <text x={cx} y={cy - 2} textAnchor="middle" className="fill-current font-serif text-[12px]">Season</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-current font-mono text-[7px] opacity-60">cycle</text>
      </svg>
    </div>
  );
}
