import styled from "styled-components";

interface CenteredContainerProps {
  $gap?: string;
}

export const CenteredContainer = styled.div<CenteredContainerProps>`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ $gap }) => $gap || '1.75rem'};
  align-items: center;
`;
