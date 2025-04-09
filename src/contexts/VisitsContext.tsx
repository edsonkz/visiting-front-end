import { createContext, useContext, useEffect, useState } from "react";
import { Visit, VisitsByDate, VisitStatus } from "../types/visit";
import { calculateVisitDuration } from "../utils/calculateVisitDuration";
import { calculateTotalMinutes } from "../utils/calculateTotalMinutes";
import { getNextDate } from "../utils/getNextDate";

type Response = {
  success: boolean;
  message: string;
};

interface VisitsContextValue {
  visits: VisitsByDate;
  addVisit: (visit: Visit) => Response;
  updateVisit: (visit: Visit) => Response;
  changeStatus: (id: string, date: string) => void;
  closeDate: (date: string) => Response;
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
    if (Object.keys(visits).length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visits));
    }
  }, [visits]);

  const addVisit = (newVisit: Visit): Response => {
    if (calculateVisitDuration(newVisit) > 480) {
      return {
        success: false,
        message: "Esta visita excede 8 horas.",
      };
    }

    const visitsOnDate = visits[newVisit.date] || [];
    // Check how much will be the totalHours after inserting new visit
    const totalHours =
      calculateTotalMinutes(visitsOnDate) + calculateVisitDuration(newVisit);

    // If total exceed 480 minutes ( 8 hours), throw error
    if (totalHours > 480) {
      return {
        success: false,
        message: "A soma das visitas excede 8 horas para essa data.",
      };
    }

    // Add new visit
    const updated = [...visitsOnDate, newVisit];
    setVisits({
      ...visits,
      [newVisit.date]: updated,
    });

    return { success: true, message: "Visita cadastrado com sucesso!" };
  };

  const updateVisit = (
    updatedVisit: Visit
  ): Response => {
    const { date: newDate, id } = updatedVisit;

    const currentVisits = visits;

    const oldDate = Object.keys(currentVisits).find((date) =>
      currentVisits[date].some((v) => v.id === id)
    );

    if (!oldDate) {
      return { success: false, message: "Visita não encontrada." };
    }

    const oldVisitList = currentVisits[oldDate].filter((v) => v.id !== id);
    const newVisitList =
      newDate === oldDate ? oldVisitList : currentVisits[newDate] || [];

    const totalMinutes = calculateTotalMinutes(newVisitList);

    const updatedMinutes = calculateVisitDuration(updatedVisit);

    if (totalMinutes + updatedMinutes > 480) {
      return {
        success: false,
        message: "O tempo total de visitas para este dia excede 8 horas.",
      };
    }

    const updatedVisits = {
      ...currentVisits,
      [oldDate]: oldVisitList,
      [newDate]: [...newVisitList, updatedVisit],
    };

    if (updatedVisits[oldDate].length === 0) {
      delete updatedVisits[oldDate];
    }

    setVisits(updatedVisits);

    return { success: true, message: "Visita atualizada com sucesso!" };
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

  const closeDate = (
    dateToClose: string
  ): { success: boolean; message: string } => {
    const currentVisits = { ...visits };

    const visitsOfDay = currentVisits[dateToClose];
    if (!visitsOfDay) {
      return { success: false, message: "Data não encontrada." };
    }

    //Get pending visits of the received date
    const pendingVisits = visitsOfDay.filter((v) => v.status !== "done");

    if (pendingVisits.length === 0) {
      return {
        success: false,
        message: "Todas as visitas já estão concluídas.",
      };
    }

    // Remove pending visits from the original date
    currentVisits[dateToClose] = visitsOfDay.filter((v) => v.status === "done");

    // Sort pending visits from oldest to newest based on ID
    pendingVisits.sort((a, b) => Number(a.id) - Number(b.id));

    // Get future dates (chronologically sorted)
    const futureDates = Object.keys(currentVisits)
      .filter((d) => d > dateToClose)
      .sort();

    for (const visit of pendingVisits) {
      const duration = calculateVisitDuration(visit);
      let moved = false;

      // Try placing the visit in the earliest future date with available time
      for (const date of futureDates) {
        const list = currentVisits[date] || [];
        const total = calculateTotalMinutes(list);

        if (total + duration <= 480) {

          currentVisits[date] = [...list, visit];
          moved = true;
          break;
        }
      }

      if (!moved) {
        // Create new date if not a futureDate not finded (incremental)
        const targetDate = getNextDate(futureDates[futureDates.length - 1] ?? dateToClose);
        const list = currentVisits[targetDate] || [];

        const updatedVisit = { ...visit, date: targetDate }; // update the internal date
        currentVisits[targetDate] = [...list, updatedVisit];
      }
    }

    // Remove old date if empty
    if (currentVisits[dateToClose].length === 0) {
      delete currentVisits[dateToClose];
    }

    setVisits(currentVisits);

    return { success: true, message: "Visitas remanejadas com sucesso." };
  };

  return (
    <VisitsContext.Provider
      value={{ visits, addVisit, updateVisit, changeStatus, closeDate }}
    >
      {children}
    </VisitsContext.Provider>
  );
}
