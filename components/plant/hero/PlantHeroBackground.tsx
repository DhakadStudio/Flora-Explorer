"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf } from "@/components/Leaf";
import { PlantImage } from "@/components/plant-image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getPlant } from "@/data/plants";

type Plant = NonNullable<ReturnType<typeof getPlant>>;

export function PlantHeroBackground({ plant }: { plant: Plant }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.25], ["0%", reduce ? "0%" : "14%"]);
  const leafY = useTransform(scrollYProgress, [0, 0.25], ["0%", reduce ? "0%" : "-22%"]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" />
      <motion.div style={{ y: imageY }} className="absolute inset-0 flex items-center justify-center">
        <PlantImage
          src={plant.image}
          alt=""
          priority
          className="h-[115vmin] w-[115vmin] max-w-none rotate-[-18deg] opacity-[0.16] md:h-[92vmin] md:w-[92vmin]"
        />
      </motion.div>
      <motion.div style={{ y: leafY }} className="absolute right-[7%] top-[18%]">
        <Leaf animate speed={1.2} className="h-20 w-20 rotate-[28deg] text-leaf/30 md:h-28 md:w-28" />
      </motion.div>
      <motion.div style={{ y: leafY }} className="absolute bottom-[16%] left-[6%]">
        <Leaf filled className="h-12 w-12 -rotate-45 text-leaf/20 md:h-16 md:w-16" />
      </motion.div>
    </div>
  );
}
