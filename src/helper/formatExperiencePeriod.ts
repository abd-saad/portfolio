const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function parseDate(value: string | null): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
    ? date
    : null;
}

export function formatExperiencePeriod(start: string | null, end: string | null, period: string): string {
  const startDate = parseDate(start);
  if (end === null) return startDate ? `${monthYear.format(startDate)} – Present` : 'Present';
  const endDate = parseDate(end);
  if (!startDate || !endDate || startDate > endDate) return period;
  return `${monthYear.format(startDate)} – ${monthYear.format(endDate)}`;
}
