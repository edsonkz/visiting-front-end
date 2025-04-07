import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;
