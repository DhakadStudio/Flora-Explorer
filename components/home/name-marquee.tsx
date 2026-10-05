import { Leaf } from '@/components/Leaf'
import { plants } from '@/data/plants'

/** Plant names in all three languages, looping. The list is duplicated so a -50% translate loops seamlessly. */
export function NameMarquee() {
  const names = plants.flatMap((p) => [
    { text: p.names.en, lang: 'en', serif: true },
    { text: p.names.hi, lang: 'hi', serif: false },
    { text: p.names.es, lang: 'es', serif: true },
  ])
  // Repeat short lists so one copy is always wider than the viewport.
  const base = Array.from({ length: Math.max(1, Math.ceil(12 / names.length)) }, () => names).flat()

  return (
    <div className="relative z-10 overflow-hidden border-y border-border bg-background/70 py-4 backdrop-blur-sm">
      <p className="sr-only">{names.map((n) => n.text).join(', ')}</p>
      <div aria-hidden className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {base.map((n, i) => (
              <li key={i} lang={n.lang} className="flex items-center gap-6 px-6">
                <span className={n.serif ? 'font-serif text-2xl italic md:text-3xl' : 'text-xl md:text-2xl'}>{n.text}</span>
                <Leaf size={16} filled className="text-leaf" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
