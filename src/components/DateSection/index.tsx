import { useVisits } from "../../contexts/VisitsContext";
import { DateCard } from "../DateCard";
import { DateContainer } from "./styles";

export const DateSection = () => {
  const { visits } = useVisits();

  return (
    <DateContainer>
      {Object.keys(visits).sort().map((key) => (
        <DateCard key={key} date={key} visits={visits[key]} />
      ))}
    </DateContainer>
  );
};
