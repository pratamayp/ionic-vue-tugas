export function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  const hours = date.getHours().toString().padStart(2, '0');
  return `${hours}:00`;
}
