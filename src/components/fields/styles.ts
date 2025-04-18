import styled from "styled-components";
import { InputMask } from "@react-input/mask";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

// Exclusive input related to MaskedField
export const StyledMask = styled(InputMask)`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 0.75rem;
`;
