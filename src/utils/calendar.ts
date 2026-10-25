export interface EventInfo {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

export const EVENT_DETAILS: EventInfo = {
  title: "15 Anos de Ruquene Zango",
  description: "Celebração do aniversário de 15 anos de Ruquene Zango. Venha celebrar esse momento especial conosco!",
  location: "Restinga • Restaurante do Hotel Plazza",
  startDate: new Date("2026-11-14T15:00:00"),
  endDate: new Date("2026-11-14T22:00:00"),
};

export function getGoogleCalendarUrl(event: EventInfo = EVENT_DETAILS): string {
  const formatTime = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const startStr = formatTime(event.startDate);
  const endStr = formatTime(event.endDate);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: EventInfo = EVENT_DETAILS) {
  const formatTime = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ruquene Zango//15 Anos Convite//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `DTSTART:${formatTime(event.startDate)}`,
    `DTEND:${formatTime(event.endDate)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "15_Anos_Ruquene_Zango.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
