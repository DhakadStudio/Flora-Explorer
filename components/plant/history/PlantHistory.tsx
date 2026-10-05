"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantHistory({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  const history = (plant as Plant & { history?: unknown }).history;

  return (
    <section id="history" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.history")}</p>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">A plant with a past.</h2>

        <div className="mt-12 max-w-3xl border-l border-leaf/40 pl-6 md:pl-10">
          {typeof history === "string" ? (
            <p className="text-lg leading-8 text-muted-foreground">{history}</p>
          ) : Array.isArray(history) ? (
            <div className="space-y-5">
              {history.map((item, index) => (
                <p key={index} className="text-lg leading-8 text-muted-foreground">
                  {typeof item === "string" ? item : JSON.stringify(item)}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-lg leading-8 text-muted-foreground">
              Historical notes are not currently documented in the plant dataset.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
