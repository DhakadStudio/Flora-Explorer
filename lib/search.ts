import { plants, type Plant } from '@/data/plants'

export type MatchField = 'en' | 'hi' | 'es' | 'scientific' | 'alias'

export type SearchResult = {
  plant: Plant
  field: MatchField
  /** The text that matched (original casing / script). */
  text: string
  /** [start, end) in `text` to highlight. */
  range: [number, number]
  score: number
}

/**
 * Normalises a string for matching (lowercase, strip Latin diacritics) while keeping
 * a map back to original indices so highlights line up even for "cúrcuma".
 */
function normalizeWithMap(input: string) {
  let out = ''
  const map: number[] = []
  for (let i = 0; i < input.length; i++) {
    const n = input[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    for (let j = 0; j < n.length; j++) {
      out += n[j]
      map.push(i)
    }
  }
  map.push(input.length)
  return { out, map }
}

export function normalize(s: string) {
  return normalizeWithMap(s).out.trim()
}

type IndexEntry = { plant: Plant; field: MatchField; text: string; norm: string; map: number[] }

const index: IndexEntry[] = plants.flatMap((plant) => {
  const fields: { field: MatchField; text: string }[] = [
    { field: 'en', text: plant.names.en },
    { field: 'hi', text: plant.names.hi },
    { field: 'es', text: plant.names.es },
    { field: 'scientific', text: plant.scientificName },
    ...plant.aliases.map((a) => ({ field: 'alias' as const, text: a })),
  ]
  return fields.map((f) => {
    const { out, map } = normalizeWithMap(f.text)
    return { plant, ...f, norm: out, map }
  })
})

const fieldWeight: Record<MatchField, number> = { en: 4, hi: 4, es: 4, scientific: 3, alias: 2 }

export function searchPlants(query: string): SearchResult[] {
  const q = normalize(query)
  if (!q) return plants.map((plant) => ({ plant, field: 'en', text: plant.names.en, range: [0, 0], score: 0 }))

  const best = new Map<string, SearchResult>()
  for (const entry of index) {
    const pos = entry.norm.indexOf(q)
    if (pos === -1) continue
    const wordStart = pos === 0 || /\s|-/.test(entry.norm[pos - 1])
    const score = fieldWeight[entry.field] + (pos === 0 ? 6 : wordStart ? 3 : 0) + (entry.norm === q ? 4 : 0)
    const range: [number, number] = [entry.map[pos], entry.map[pos + q.length]]
    const prev = best.get(entry.plant.slug)
    if (!prev || score > prev.score) {
      best.set(entry.plant.slug, { plant: entry.plant, field: entry.field, text: entry.text, range, score })
    }
  }
  return [...best.values()].sort((a, b) => b.score - a.score)
}
