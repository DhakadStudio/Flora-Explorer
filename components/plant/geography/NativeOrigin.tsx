"use client";

import { MapPin } from "lucide-react";
import { getPlant } from "@/data/plants";
import { useLanguage } from "@/components/providers/language-provider";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function NativeOrigin({ plant }: { plant: Plant }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6">
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 text-leaf" />
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("globe.origin") || "Native origin"}
          </p>
          <p className="mt-2 font-serif text-2xl">{plant.geography.nativeRegion}</p>
        </div>
      </div>
    </div>
  );
}
