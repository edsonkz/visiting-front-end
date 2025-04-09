import styled from "styled-components";

export const Tag = styled.h4`
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  width: fit-content;
  padding: 0.5rem 1rem;
  margin-bottom: 0.35rem;
`;
