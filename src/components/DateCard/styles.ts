import styled from "styled-components";

interface StyledCardProps {
  cardperrow?: "1" | "2";
}

export const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  -webkit-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  width: 100%;
`;

export const StyledVisitCard = styled.div`
  -webkit-box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  border: 1px solid gainsboro;
`;

export const RowDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
`;

export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
