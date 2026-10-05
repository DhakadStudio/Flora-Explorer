"use client";

import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";
import { Globe } from "@/components/Globe";
import { NativeOrigin } from "./NativeOrigin";
import { ProducerRanking } from "./ProducerRanking";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantGeography({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <section id="geography" className="scroll-mt-32 border-b border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-leaf">{t("sec.globe") || "Geography"}</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl">From origin to world.</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-h-[420px] overflow-hidden rounded-3xl border border-border bg-card/30">
            <Globe plant={plant} className="h-full w-full" />
          </div>
          <div className="space-y-4">
            <NativeOrigin plant={plant} />
            <ProducerRanking plant={plant} />
          </div>
        </div>
      </div>
    </section>
  );
}
