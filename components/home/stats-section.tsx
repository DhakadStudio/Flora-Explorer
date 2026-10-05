'use client'

import { CountUp } from '@/components/count-up'
import { useLanguage } from '@/components/providers/language-provider'
import { getStats } from '@/data/plants'
import type { TKey } from '@/lib/i18n'

export function StatsSection() {
  const { t } = useLanguage()
  const stats = getStats()
  const items: { key: TKey; value: number }[] = [
    { key: 'stats.plants', value: stats.plants },
    { key: 'stats.countries', value: stats.countries },
    { key: 'stats.uses', value: stats.uses },
  ]
  return (
    <section aria-labelledby="stats-title" className="border-y border-border">
      <h2 id="stats-title" className="sr-only">
        {t('stats.eyebrow')}
      </h2>
      <dl className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((item, i) => (
          <div key={item.key} className="flex flex-col gap-2 px-5 py-12 md:px-10 md:py-16">
            <dt className="order-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-leaf-ink">{String(i + 1).padStart(2, '0')}</span>
              {t(item.key)}
            </dt>
            <dd className="order-1 font-serif text-7xl font-medium tabular-nums tracking-tight md:text-8xl">
              <CountUp value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
