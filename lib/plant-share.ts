export async function sharePlant({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url?: string;
}) {
  const shareUrl = url ?? window.location.href;

  if (navigator.share) {
    await navigator.share({ title, text, url: shareUrl });
    return "shared" as const;
  }

  await navigator.clipboard.writeText(shareUrl);
  return "copied" as const;
}
