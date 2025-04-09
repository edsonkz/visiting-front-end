import { Visit } from "../types/visit";

export const calculateVisitDuration = (visit: Visit): number => {
  return visit.forms * 15 + visit.products * 5;
};
