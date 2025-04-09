import { Visit } from "../types/visit";
import { calculateVisitDuration } from "./calculateVisitDuration";

export function calculateTotalMinutes(visits: Visit[]): number {
  return visits.reduce(
    (total, visit) => total + calculateVisitDuration(visit),
    0
  );
}
