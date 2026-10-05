# Flora Explorer Plant Page — complete implementation pack

Paste/run in this order:

1. components/plant/PlantPageShell.tsx
2. components/plant/PlantNavigation.tsx
3. components/plant/PlantPage.tsx
4. components/plant/hero/*
5. components/plant/navigation/*
6. hooks/*
7. components/plant/overview/*
8. components/plant/climate/*
9. components/plant/geography/*
10. components/plant/uses/*
11. components/plant/history/*
12. components/plant/composition/*
13. components/plant/seasonality/*
14. components/plant/taxonomy/*
15. components/plant/related/*
16. lib/plant-utils.ts
17. lib/plant-share.ts
18. app/plant/[slug]/page.tsx

Important:
- This implementation uses the existing Next.js App Router.
- It does not use TanStack Router.
- It reuses the existing Globe, Leaf, PlantImage, language provider and plant dataset.
- Existing data in data/plants.ts remains the source of truth.
- If your current project has different translation keys, your AI may need to adjust only those fallback labels.
- Run TypeScript after each folder:
  npx tsc --noEmit
- Then run:
  npm run dev

Known compatibility note:
The original page source shows growth, geography, composition, seasonality and taxonomy fields. History was a placeholder in the supplied source, so PlantHistory intentionally renders a graceful fallback unless a history field exists in the data.
