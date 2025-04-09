import styled from "styled-components";

interface StyledCardProps {
  cardperrow?: "1" | "2";
}

interface RowDivProps {
  hasbackground?: boolean;
  marginbottom?: string;
}

export const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  -webkit-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondaryDark};
  width: 100%;
`;

export const StyledVisitCard = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.secondaryDark};

  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const RowDiv = styled.div<RowDivProps>`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ marginbottom }) =>
    marginbottom ? marginbottom : "1rem"};
  ${({ theme, hasbackground }) =>
    hasbackground &&
    `
    background-color: ${theme.colors.secondaryDark};
    color: ${theme.colors.white};
    padding: 0.75rem;
  `}

  ${(props) =>
    !props.hasbackground &&
    `
    background-color: transparent;
    color: black;
    padding: 0px;
  `}
  border-radius: 0.25rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
`;

export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
