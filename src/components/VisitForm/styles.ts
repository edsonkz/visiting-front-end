import styled from "styled-components";

type FormRowProps = {
  gap?: number;
};

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div<FormRowProps>`
  display: flex;
  gap: ${({ gap }) => gap ?? 16}px;

  > * {
    flex: 1;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
