import { createContext, useContext, useEffect, useState } from "react";
import { Visit, VisitsByDate, VisitStatus } from "../types/visit";

interface VisitsContextValue {
  visits: VisitsByDate;
  addVisit: (visit: Visit) => void;
  updateVisit: (visit: Visit) => void;
  changeStatus: (id: string, date: string) => void;
  closeDate: (date: string) => void;
}

const VisitsContext = createContext({} as VisitsContextValue);

export const useVisits = () => useContext(VisitsContext);

const LOCAL_STORAGE_KEY = "visits";

export function VisitsProvider({ children }: { children: React.ReactNode }) {
  const [visits, setVisits] = useState<VisitsByDate>({});

  // Loading Visits from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setVisits(JSON.parse(stored));
    }
  }, []);

  // Saving any visits changes on localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visits));
  }, [visits]);

  const addVisit = (visit: Visit) => {
    setVisits((prev) => {
      const dateVisits = prev[visit.date] || [];
      return {
        ...prev,
        [visit.date]: [...dateVisits, visit],
      };
    });
  };

  const updateVisit = (updatedVisit: Visit) => {
    setVisits((prev) => {
      const dateVisits = prev[updatedVisit.date] || [];
      const newVisits = dateVisits.map((v) =>
        v.id === updatedVisit.id ? updatedVisit : v
      );
      return { ...prev, [updatedVisit.date]: newVisits };
    });
  };

  const changeStatus = (id: string, date: string) => {
    setVisits((prev) => {
      const updated = (prev[date] || []).map((visit) =>
        visit.id === id
          ? {
              ...visit,
              status: (visit.status === "pending"
                ? "done"
                : "pending") as VisitStatus,
            }
          : visit
      );
      return { ...prev, [date]: updated };
    });
  };

  const closeDate = (date: string) => {
    // lógica de realocar visitas pendentes para o próximo dia
    // podemos implementar depois em conjunto
  };

  return (
    <VisitsContext.Provider
      value={{ visits, addVisit, updateVisit, changeStatus, closeDate }}
    >
      {children}
    </VisitsContext.Provider>
  );
}
