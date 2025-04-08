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

export interface VisitFormData {
  date: string;
  forms: number;
  products: number;
  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

export interface VisitsByDate {
  [date: string]: Visit[];
}