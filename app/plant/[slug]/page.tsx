import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlant, plants } from "@/data/plants";
import { PlantPage } from "@/components/plant/PlantPage";
import { generatePlantMetadata } from "@/lib/site";

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const plant = getPlant(params.slug);

  if (!plant) {
    return {};
  }

  return generatePlantMetadata({
    name: plant.names.en,
    scientificName: plant.scientificName,
    summary: plant.summary,
    image: plant.image,
    slug: plant.slug,
  });
}

export default function PlantRoute({
  params,
}: {
  params: { slug: string };
}) {
  const plant = getPlant(params.slug);

  if (!plant) {
    notFound();
  }

  return <PlantPage slug={plant.slug} />;
}
