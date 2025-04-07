import { StyledCard } from "./styles";

interface DateSectionProps {
  workday: string;
}

export const DateSection = ({ workday }: DateSectionProps) => {
  return (
    <StyledCard>
      <h3>{workday}</h3>
    </StyledCard>
  );
};
