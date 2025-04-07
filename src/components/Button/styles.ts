import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  -webkit-box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;
