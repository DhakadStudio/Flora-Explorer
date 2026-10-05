import { getPlant } from "@/data/plants";

export type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function getPlantName(plant: Plant, lang: string) {
  return plant.names[lang as keyof typeof plant.names] ?? plant.names.en;
}

export function midpoint(range: readonly [number, number]) {
  return (range[0] + range[1]) / 2;
}

export function normalize(value: number, min: number, max: number) {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function rangeMidpoint(range: readonly [number, number]) {
  return normalize(midpoint(range), range[0], range[1]);
}
