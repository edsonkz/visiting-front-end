import { Address } from "./address";

export type VisitStatus = "pending" | "done";

export interface Visit {
  id: string;
  date: string; // ISO format, ex: "2025-04-07"
  status: VisitStatus;
  forms: number;
  products: number;
  address: Address;
}
