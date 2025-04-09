import styled from "styled-components";
import { Variant } from "../../Button/styles";

type StyledPercentageProps = {
  variant: Variant;
};

export const StyledPercentage = styled.div<StyledPercentageProps>`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme, variant }) => theme.colors[variant] };
    padding: 0.5rem;
    border-radius: 0.25rem;
`;