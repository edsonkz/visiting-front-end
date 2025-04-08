import { StyledPercentage } from "./styles";

interface PercentageColorProps {
  percentage: number;
}

export const PercentageColor = ({ percentage }: PercentageColorProps) => {
  return (
    <StyledPercentage>
      <h4>{percentage}% de visitas completadas</h4>
    </StyledPercentage>
  );
};
