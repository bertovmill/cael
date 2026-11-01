/**
 * HYROX races: the stations, your results and upcoming races.
 *
 * Hand-kept on purpose. The official results (results.hyrox.com, run by
 * mika:timing) sit behind Cloudflare and 403 any server-side fetch, and the
 * hyranking.com mirror starts challenging after a handful of requests, so a
 * cron scraper would break silently. After a race, open the result in a real
 * browser (the `resultUrl` of an upcoming race already points at your
 * entry), copy the workout summary in here, and move the race from UPCOMING
 * to RESULTS.
 */

/** The eight stations, in race order. Every result's splits follow this order. */
export const HYROX_STATIONS = [
  { name: "SkiErg", distance: "1000 m" },
  { name: "Sled Push", distance: "50 m" },
  { name: "Sled Pull", distance: "50 m" },
  { name: "Burpee Broad Jumps", distance: "80 m" },
  { name: "Row", distance: "1000 m" },
  { name: "Farmers Carry", distance: "200 m" },
  { name: "Sandbag Lunges", distance: "100 m" },
  { name: "Wall Balls", distance: "100 reps" },
] as const;

/** One run plus the station that follows it. Times are m:ss, as the official summary prints them. */
export type HyroxSplit = {
  run: string;
  station: string;
  /** Place on that station, from the official workout summary. */
  stationRank: number;
};

export type HyroxResult = {
  /** A stable id, e.g. hyrox-ottawa-2026. */
  slug: string;
  event: string;
  /** Race day, YYYY-MM-DD. */
  date: string;
  division: string;
  partner?: string;
  ageGroup: string;
  total: string;
  rank: number;
  /** How many finished in the field `rank` is counted against, e.g. 601 "mixed teams". */
  fieldSize: number;
  fieldLabel: string;
  runTotal: string;
  roxzone: string;
  /** Exactly eight, in HYROX_STATIONS order. */
  splits: readonly HyroxSplit[];
  resultUrl: string;
};

export type HyroxUpcoming = {
  slug: string;
  event: string;
  date: string;
  division: string;
  ageGroup: string;
  /** Your entry on the official site. It fills in with splits once you finish. */
  resultUrl: string;
};

/** Your HYROX results, newest first. Add one after each race. */
export const HYROX_RESULTS: readonly HyroxResult[] = [];

/** Races you are entered in. Soonest first. */
export const HYROX_UPCOMING: readonly HyroxUpcoming[] = [];

/** "55:20" or "1:02:10" → seconds. */
export function hyroxSeconds(time: string): number {
  return time.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** Today's date in Toronto as YYYY-MM-DD, so a race stops being "up next" at local midnight. */
export function torontoToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(now);
}

/** Whole days from `today` to `date`, both YYYY-MM-DD. */
export function daysUntil(date: string, today: string): number {
  return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000);
}

/** "2026-05-16" → "Saturday, May 16, 2026". Parsed at noon UTC so no timezone can shift the day. */
export function formatRaceDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** 1 → "1st", 22 → "22nd", 11 → "11th". */
export function ordinal(n: number): string {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  const suffix = teen ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
}
