import { toast } from "react-toastify";
import { useVisits } from "../../contexts/VisitsContext";
import { Visit } from "../../types/visit";
import { calculateTotalMinutes } from "../../utils/calculateTotalMinutes";
import { formatDateToDisplay } from "../../utils/formatDateToDisplay";
import { Button } from "../Button";
import { VisitCard } from "../VisitCard";
import { PercentageColor } from "./PercentageColor";
import { Grid, InfoDiv, RowDiv, StyledCard } from "./styles";

interface DateCardProps {
  visits: Visit[];
  date: string;
}

export const DateCard = ({ date, visits }: DateCardProps) => {
  const { closeDate } = useVisits();
  const totalDuration = calculateTotalMinutes(visits);
  const durationPercentage = (totalDuration * 100) / 480;

  const totalCompleted = calculateTotalMinutes(visits.filter(
    (visit) => visit.status === "done"
  ));
  const completedPercentage = (totalCompleted * 100) / totalDuration;

  const handleCloseDate = () => {
    const response = closeDate(date);

    toast(response.message, { type: response.success ? "success" : "error" });
  }

  return (
    <StyledCard>
      <RowDiv hasbackground>
        <h2>{formatDateToDisplay(date)}</h2>
        <InfoDiv>
          <h4>{durationPercentage.toFixed(2)}% de horas consumidas</h4>
          <PercentageColor percentage={completedPercentage} />
        </InfoDiv>
      </RowDiv>
      <Grid>
        {visits.map((visit) => (
          <VisitCard key={visit.id} visit={visit} />
        ))}
      </Grid>
      <Button variant="danger" onClick={handleCloseDate}>
        Fechar Dia
      </Button>
    </StyledCard>
  );
};
