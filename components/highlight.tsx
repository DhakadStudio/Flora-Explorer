export function Highlight({ text, range }: { text: string; range: [number, number] }) {
  const [s, e] = range
  if (e <= s) return <>{text}</>
  return (
    <>
      {text.slice(0, s)}
      <mark className="rounded-sm bg-leaf/20 px-0.5 text-foreground">{text.slice(s, e)}</mark>
      {text.slice(e)}
    </>
  )
}
