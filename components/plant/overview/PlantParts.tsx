"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantParts({ plant }: { plant: Plant }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(plant.partsUsed?.[0]?.part ?? "");

  const selected = plant.partsUsed?.find((item) => item.part === active);

  return (
    <article id="parts" className="scroll-mt-32 border-t border-border/50 pt-8">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">{t("sec.parts")}</p>

      {!plant.partsUsed?.length ? (
        <p className="mt-4 text-muted-foreground">No specific parts documented.</p>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {plant.partsUsed.map((item) => (
              <button
                key={item.part}
                onClick={() => setActive(item.part)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                  active === item.part
                    ? "border-leaf bg-leaf text-leaf-foreground"
                    : "border-border hover:border-leaf/50"
                }`}
              >
                {item.part}
              </button>
            ))}
          </div>

          {selected && (
            <motion.div
              key={selected.part}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-border bg-card/50 p-6"
            >
              <h3 className="font-serif text-2xl">{selected.part}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {selected.uses.map((use, index) => <li key={index}>— {use}</li>)}
              </ul>
            </motion.div>
          )}
        </>
      )}
    </article>
  );
}
