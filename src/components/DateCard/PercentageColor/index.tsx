import { StyledPercentage } from "./styles";

interface PercentageColorProps {
  percentage: number;
}

export const PercentageColor = ({ percentage }: PercentageColorProps) => {
  const $variant = getColorByPercentage(percentage);

  function getColorByPercentage(
    percentage: number
  ): "danger" | "success" | "blue" {
    if (percentage < 60) return "danger";
    if (percentage > 90) return "success";
    return "blue";
  }

  return (
    <StyledPercentage $variant={$variant}>
      <h4>{percentage.toFixed(2)}% de visitas completadas</h4>
    </StyledPercentage>
  );
};
