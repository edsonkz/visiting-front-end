import { Visit } from "../../types/visit";
import { calculateVisitDuration } from "../../utils/calculateVisitDuration";
import { formatDateToDisplay } from "../../utils/formatDateToDisplay";
import { PercentageColor } from "./PercentageColor";
import { StyledCard } from "./styles";

interface DateCardProps {
  visits: Visit[];
  date: string;
}

export const DateCard = ({ date, visits }: DateCardProps) => {
  const totalDuration = visits.reduce(
    (acc, visit) => acc + calculateVisitDuration(visit),
    0
  );
  const durationPercentage = (totalDuration * 100) / 480;

  const totalCompleted = visits.filter(
    (visit) => visit.status === "done"
  ).length;
  const completedPercentage = (totalCompleted * 100) / visits.length;

  return (
    <StyledCard>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h3>{formatDateToDisplay(date)}</h3>
        <h4>{durationPercentage.toFixed(2)}% de horas consumidas</h4>
        <PercentageColor percentage={completedPercentage} />
      </div>
    </StyledCard>
  );
};
