/** Display label for a comic panel (e.g. "Page 1"). Falls back using slot index. */
export function getComicPageLabel(panel: { pageLabel?: string }, slotIndex: number): string {
  const custom = panel.pageLabel?.trim();
  return custom || `Page ${slotIndex + 1}`;
}
