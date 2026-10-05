"use client";

import { useScroll, useSpring } from "framer-motion";

export function usePlantScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
}
