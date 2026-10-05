"use client";

import { ReactNode } from "react";

export function PlantPageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white dark:bg-black">{children}</div>;
}
