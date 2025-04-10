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

  // Add new Visit function
  const addVisit = (newVisit: Visit): Response => {
    // Validate new visit duration
    if (calculateVisitDuration(newVisit) > 480) {
      return {
        success: false,
        message: "Esta visita excede 8 horas.",
      };
    }

    // Get visits from the selected date. If date don't exists, returns a empty array
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

  // Update Visit function
  const updateVisit = (updatedVisit: Visit): Response => {
    const { date: newDate, id } = updatedVisit;

    const currentVisits = visits;

    // Find the current date from this visit
    const oldDate = Object.keys(currentVisits).find((date) =>
      currentVisits[date].some((v) => v.id === id)
    );

    // If not finded, the visit doesn't exist and throws error
    if (!oldDate) {
      return { success: false, message: "Visita não encontrada." };
    }

    // Get the others visits from that date
    const oldVisitList = currentVisits[oldDate].filter((v) => v.id !== id);
    // Get the new visit list that the updated visit will enter if the date was changed
    const newVisitList =
      newDate === oldDate ? oldVisitList : currentVisits[newDate] || [];

      // Get the current total minutes of the new date list of visits that the updated visit will enter
    const totalMinutes = calculateTotalMinutes(newVisitList);
    // Get the updated visit total duration
    const updatedMinutes = calculateVisitDuration(updatedVisit);

    // Check if updated visit will not exceed the minutes limit
    if (totalMinutes + updatedMinutes > 480) {
      return {
        success: false,
        message: "O tempo total de visitas para este dia excede 8 horas.",
      };
    }

    // Update list of all dates with the new visits disposition
    const updatedVisits = {
      ...currentVisits,
      [oldDate]: oldVisitList,
      [newDate]: [...newVisitList, updatedVisit],
    };

    // Delete old date if is empty
    if (updatedVisits[oldDate].length === 0) {
      delete updatedVisits[oldDate];
    }

    setVisits(updatedVisits);

    return { success: true, message: "Visita atualizada com sucesso!" };
  };

  const changeStatus = (id: string, date: string) => {
    setVisits((prev) => {
      // Find and update the visit with same id
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
    // Creates a copy of the visits
    const currentVisits = { ...visits };

    // Get visits of the day that will be closed and return error if date not found
    const visitsOfDay = currentVisits[dateToClose];
    if (!visitsOfDay) {
      return { success: false, message: "Data não encontrada." };
    }

    //Get pending visits of the received date
    const pendingVisits = visitsOfDay.filter((v) => v.status !== "done");

    // Return error if all visits of that date are already done
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

    /* 
      The oldest pending visit will be always before the youngest visit,
      so because of that, the current Date needs to be set before the for
    */
    let currentDate = getNextDate(dateToClose);
    for (const visit of pendingVisits) {
      const duration = calculateVisitDuration(visit);

      // Try placing the visit in the earliest future date with available time
      while (true) {
        const list = currentVisits[currentDate] || [];
        const total = calculateTotalMinutes(list);

        // If total duration is lesser than 480 minutes (8 h), insert into the new date
        if (total + duration <= 480) {
          const updatedVisit = { ...visit, date: currentDate };
          currentVisits[currentDate] = [...list, updatedVisit];
          break;
        }

        // Next Date
        currentDate = getNextDate(currentDate);
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
